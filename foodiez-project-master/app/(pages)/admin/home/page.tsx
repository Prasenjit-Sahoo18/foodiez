import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { MenuItem, Type } from "@/app/config";
import axios from "axios";
import AdminHome from "./home";
import { redirect } from "next/navigation";
import { getCache, setCache } from "@/lib/cache";

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
    
    try {
        const response = await axios.get(`${process.env.BACKEND_URL}/api/menu/all`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error while fetching menu items ", error);
    }
};

export default async function AdminHomePage() {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.email!=="admin@gmail.com") {
        redirect("/dashboard"); // ✅ No need to return
    }

    const typesData = await fetchTypes() || [];
    const menuItemsData = await fetchMenuItems() || [];

    if (!typesData) {
        console.log("Error");
    }
    if (!menuItemsData) {
        console.log("Error");
    }

    return <AdminHome  typesData={typesData} menuItemsData={menuItemsData || []} />;
}
