"use client";

import Navbar from "@/app/components/ui/Navbar";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import Footer from "@/app/components/ui/Footer";
import ProfileModal from "@/app/components/ui/ProfileModal";
import { useProfileModalStore } from "@/store";

export default function UserLayout({ children }: { children: ReactNode }) { // Named the function "UserLayout"
  const profileModal = useProfileModalStore((state) => state.modal);

  return (
    <SessionProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{ fontFamily: "DM Sans" }}
        className="bg-black text-white w-full flex flex-col lg:gap-36 md:gap-28 gap-20 items-center justify-center"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col"
        >
          <div className="sticky top-0 z-50 bg-opacity-50 backdrop-filter backdrop-blur-md bg-gradient-to-r from-gray-800/30 via-indigo-700/30 to-blue-600/30 w-full">
            <Navbar />
          </div>
          {children}
          {profileModal && <ProfileModal />}
        </motion.div>
        <Footer />
      </motion.div>
    </SessionProvider>
  );
}