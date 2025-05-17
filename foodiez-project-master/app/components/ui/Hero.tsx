"use client"

import { motion } from "framer-motion"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CalendarIcon, ChefHatIcon, HygieneIcon, RightArrowIcon, UtensilsIcon } from "./Icons";
import Link from "next/link";
import RevealText from "./RevealText";

export default function Hero() {
    const router = useRouter();
    const session = useSession();
    const user = session.data?.user;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex w-full md:h-[750px] h-[680px] bg-[url('/new-hero-7.jpg')] bg-cover bg-center font-dmsans before:absolute before:inset-0 before:bg-black/40 before:backdrop-blur-2xs before:z-0 overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
            <div className="relative w-full z-10 flex flex-col md:gap-20 gap-12 justify-center items-center">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center w-full items-center md:gap-6 gap-3 ">
                    <div className="bg-amber-950/70 md:px-5 px-3 md:py-2 py-1 rounded-full border-1 border-amber-700/80 text-[10px] md:text-lg text-amber-white md:font-medium flex md:gap-2 gap-1 justify-center items-center">
                        <ChefHatIcon classname="md:h-7 h-3" />
                        <h3>Experience Fine Dining</h3>
                    </div>
                    <div className="flex w-full lg:gap-5 md:gap-4 gap-2 md:mt-2 lg:mt-0  font-semibold lg:text-7xl md:text-6xl text-3xl justify-center font-fredoka px-4">
                        {/* <motion.h1 initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, ease: "linear" }} className="w-full text-9xl font-kaushan-script p-0 m-0 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 overflow-hidden whitespace-nowrap">Welcome To</motion.h1>
                    <motion.h1 initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, ease: "easeInOut", delay: 1 }} className="text-[144px] font-montez  font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-400 via-yellow-500 p-0 m-0  -translate-y-4 overflow-hidden whitespace-nowrap">
                        Foodiez
                    </motion.h1> */}

                        <h1 className=" flex lg:gap-5 md:gap-4 gap-2"><RevealText>Welcome</RevealText><RevealText>to</RevealText></h1>
                        <h1 className="text-amber-500"><RevealText>Foodiez</RevealText></h1>

                    </div>

                    <h2 className="lg:text-[20px] px-3 md:text-lg text-xs  text-gray-300 md:max-w-160 max-w-120 text-center ">Experience exceptional dining with our curated menu and seamless table booking system. Every dish tells a story.</h2>


                </motion.div>


                <motion.div
                    initial={{ y: "50%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="flex md:gap-16 gap-8">
                    <button
                        onClick={() => {
                            if (!user) {
                                toast.error("Please login to book table.", {
                                    duration: 1200

                                })
                            }
                            else {
                                router.push("/book")
                            }
                        }} className="relative z-10 md:py-1 md:h-12 flex px-4 rounded-full hover:translate-x-3 bg-gradient-to-r from-amber-500 to-amber-900/50 hover:from-amber-400 hover:to-amber-600/60  md:text-lg text-xs font-semibold cursor-pointer ml-2 transition-all transform inset 2s  hover:border-0  justify-center items-center md:w-52 gap-2 hover:gap-3 duration:800">Book A Table <RightArrowIcon classname="hover:translate-x-5 md:h-5 h-4" />
                        <span className="absolute z-0 inset-0 border-2 border-amber-500/40 hover:border-transparent  rounded-full opacity-80 
                        transition-all duration-500 hover:opacity-100  translate-x-2 hover:scale-y-100 hover:-translate-x-0 scale-y-120 "></span>
                    </button>

                    <button className="md:px-8 px-5 md:h-12 py-2  md:text-lg text-xs bg-slate-800/80 hover:bg-slate-700/70 cursor-pointer hover:scale-103 transform transition  border-1 border-slate-500  text-white rounded-full"><Link href="#menu-section">View Menu</Link></button>

                </motion.div>

                <div className="flex flex-col md:flex-row w-full items-center lg:justify-around gap-6 justify-center md:mt-6 mt-2 px-4 ">
                    <motion.div
                        initial={{ y: 0, opacity: 1 }}
                        whileHover={{ y: -10, opacity: 1 }}
                        className="flex flex-col justify-between lg:w-108 gap-5 md:w-96 w-80 lg:h-44 md:h-34 border-1 border-gray-700 bg-slate-900 lg:px-8 lg:py-8 px-4 py-4 rounded-xl hover:border-amber-600 ">
                        <div className="flex gap-2 font-semibold items-center"><UtensilsIcon classname="h-6 lg:h-8" /><h3 className="lg:text-2xl md:text-xl">Browse Menu</h3></div>
                        <h4 className="lg:text-lg md:text-sm text-xs text-gray-400">Discover delicious meals curated just for you.</h4>
                    </motion.div>
                    <motion.div  initial={{ y: 0, opacity: 1 }}
                        whileHover={{ y: -10, opacity: 1 }}
                        className="flex flex-col justify-between lg:w-108 gap-5 md:w-96 w-80 lg:h-44 md:h-34 border-1 border-gray-700 bg-slate-900 lg:px-8 lg:py-8 px-4 py-4 rounded-xl hover:border-amber-600 ">
                        <div className="flex gap-2 font-semibold items-center"><CalendarIcon classname="h-6 lg:h-8" /><h3 className="lg:text-2xl md:text-xl">Book a Table</h3></div>
                        <h4 className="lg:text-lg md:text-sm text-xs text-gray-400">Discover delicious meals curated just for you.</h4>
                    </motion.div>
                    <motion.div  initial={{ y: 0, opacity: 1 }}
                        whileHover={{ y: -10, opacity: 1 }}
                        className="flex flex-col justify-between lg:w-108 gap-5 md:w-96 w-80 lg:h-44 md:h-34 border-1 border-gray-700 bg-slate-900 lg:px-8 lg:py-8 px-4 py-4 rounded-xl hover:border-amber-600 ">
                        <div className="flex gap-2 font-semibold items-center"><HygieneIcon classname="h-7 lg:h-9" /><h3 className="lg:text-2xl md:text-xl">Hygiene & Safety</h3></div>
                        <h4 className="lg:text-lg md:text-sm text-xs text-gray-400">We follow all hygiene protocols for your safety.</h4>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
