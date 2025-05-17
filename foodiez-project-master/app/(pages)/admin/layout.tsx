"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import Footer from "@/app/components/ui/Footer";
import ProfileModal from "@/app/components/ui/ProfileModal";
import { useProfileModalStore, useUpdateModalStore } from "@/store";
import AdminNavbar from "@/app/components/ui/AdminNavbar";
import UpdateModal from "@/app/components/ui/UpdateModal";

export default function AdminLayout({ children }: { children: ReactNode }) { // Added a named function
  const profileModal = useProfileModalStore((state) => state.modal);
  const updateModal = useUpdateModalStore((state) => state.modal);

  return (
    <SessionProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{ fontFamily: "DM Sans" }}
        className="bg-black text-white w-full flex flex-col gap-36 items-center justify-center"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col"
        >
          <div className="sticky top-0 z-50 bg-opacity-50 backdrop-filter backdrop-blur-md bg-gradient-to-r from-gray-800/30 via-indigo-700/30 to-blue-600/30 w-full">
            <AdminNavbar />
          </div>
          {children}
          {profileModal && <ProfileModal />}
          {updateModal && <UpdateModal />}
        </motion.div>
        <Footer />
      </motion.div>
    </SessionProvider>
  );
}