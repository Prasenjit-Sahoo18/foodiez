
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";
import { useEffect } from "react";

export default async function Home() {
  const session = await getServerSession(authOptions);

 if(session?.user.email=="admin@gmail.com"){
     redirect("/admin/home");
  }
  else{
    redirect("/dashboard");
  }

  return (
    <div className="w-screen"></div>
  );
}
