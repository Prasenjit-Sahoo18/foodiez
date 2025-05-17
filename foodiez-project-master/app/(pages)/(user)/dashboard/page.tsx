import { getServerSession } from "next-auth";
import Dashboard2 from "./Dashboard";
import { authOptions } from "@/lib/auth";
import { MenuItem, Type } from "@/app/config";
import axios from "axios";
import { getCache, setCache } from "@/lib/cache";
import { redirect } from "next/navigation";

const CACHE_TTL = 60 * 60; // Cache for 1 hour

 const fetchTypes = async (): Promise<Type[] | undefined> => {
    const cacheKey = "typesData";
    const cachedData = getCache<Type[]>(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await axios.get(`${process.env.BACKEND_URL}/api/type`, {});
        const data = response.data as { response: Type[] };
        setCache(cacheKey, data.response, CACHE_TTL);
        return data.response;
    } catch (error) {
        console.error("Error fetching types:", error);
    }
};

 const fetchMenuItems = async (): Promise<MenuItem[] | undefined> => {
    const cacheKey = "menuItemsData";
    const cachedData = getCache<MenuItem[]>(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await axios.get(`${process.env.BACKEND_URL}/api/menu/all`);
        const data = response.data;
        setCache(cacheKey, data, CACHE_TTL);
        return data;
    } catch (error) {
        console.error("Error while fetching menu items ", error);
    }
};

export default async function DashboardPage() {
    const typesData = await fetchTypes() || [];
    const menuItemsData = await fetchMenuItems();

    if (!typesData) {
        console.log("Error");
    }

    const session = await getServerSession(authOptions);

    if (!session) {
        console.log("No session");
        return <Dashboard2 typesData={typesData || []} menuItemsData={menuItemsData || []} />;
    }

    if(session.user.email==="admin@gmail.com"){
        redirect("/admin/home")
    }

    return <Dashboard2 session={session} typesData={typesData} menuItemsData={menuItemsData || []} />;
}