import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Cart from "./Cart";

export default async function CartPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/dashboard"); // ✅ No need to return

    }
    return <Cart session={session} />;
}
