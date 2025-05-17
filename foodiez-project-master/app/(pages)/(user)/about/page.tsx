"use client";

import Testimonials from "@/app/components/ui/testimonials";
import Link from "next/link";
import { motion } from "framer-motion";

export default function About() {
    return <motion.div
        className="w-full font-dmsans flex flex-col lg:gap-36 md:gap-28 gap-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >

        <motion.div initial={{ width: "92%" }} animate={{ width: "100%" }} transition={{ duration: 0.4 }} className="bg-[url('/about-hero.png')] flex lg:pl-8 md:pl-4 pl-2 w-full lg:h-[650px] md:h-[450px] h-[320px]  bg-cover bg-center overflow-hidden">
            <div className="lg:mt-20 md:mt-16 mt-8 lg:ml-12 md:ml-8 ml-2 md:w-2/5 w-1/2 flex flex-col lg:gap-8 md:gap-6 gap-4">
                <h1 className="lg:text-8xl md:text-6xl text-4xl font-bold font-fredoka text-yellow-500">Foodiez</h1>
                <h3 className="lg:text-xl md:text-sm text-[10px] text-gray-300">Foodiez is a modern, all-in-one restaurant management platform designed to streamline operations and enhance customer experiences. Whether you&apos;re a restaurant owner, manager, or customer, Foodiez provides an intuitive and seamless way to browse menus, place orders, book tables, and manage reservations all in one place!</h3>

                <div className="flex lg:gap-18 md:gap-12 gap-8 lg:mt-12 md:mt-8 mt-4 p-2 lg:text-md md:text-sm text-[10px]">
                    <Link href="/dashboard"><button className="lg:p-2 lg:px-6 md:px-4 md:py-1.5 px-2 py-1 lg:rounded-lg md:rounded-md rounded-sm hover:translate-x-3 bg-red-500  cursor-pointer  transition transform inset 2s hover:scale-105 hover:border-0 flex justify-centeritems-center">Order now
                        <span className="absolute inset-0 lg:border-2 border-1 border-red-500  lg:rounded-lg md:rounded-md rounded-sm opacity-80 
                        transition-all duration-300 hover:opacity-100  lg:translate-x-2 translate-x-1 hover:scale-y-100 hover:-translate-x-0 scale-y-125"></span>
                    </button></Link>
                    <Link href="/contact"><button className="lg:p-2 lg:px-6 md:px-4 md:py-1.5  px-2 py-1 lg:rounded-lg md:rounded-md rounded-sm hover:translate-x-3 bg-red-500 cursor-pointer  transition transform inset 2s hover:scale-105 hover:border-0 flex justify-centeritems-center">Contact Us
                        <span className="absolute inset-0 lg:border-2 border-1 border-red-500 lg:rounded-lg md:rounded-md rounded-sm opacity-80 
                        transition-all duration-300 hover:opacity-100  lg:translate-x-2 translate-x-1 hover:scale-y-100 hover:-translate-x-0 scale-y-125"></span>
                    </button></Link>
                </div>
            </div>
        </motion.div>

        <div className="w-full flex flex-col justify-center items-center lg:gap-24 md:gap-16 gap-8 lg:px-20 md:px-8 px-4">
            <h1 className="lg:text-5xl md:text-4xl text-2xl text-center font-semibold font-fredoka">Perfect Place For An Exceptional Experience</h1>
            <div className="flex md:flex-row flex-col lg:gap-16 gap-8 justify-center items-center">
                <motion.img
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }} src="/side.png" alt="" className="w-1/2"
                />
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-8 text-gray-300">
                    <h3 className="lg:text-lg md:text-sm text-xs">
                        Indulge in a delightful dining experience where exceptional flavors, warm ambiance, and top-notch service come together. Whether you&apos;re here for a casual meal, a special celebration, or a relaxing time with loved ones, our restaurant promises an unforgettable experience. Savor every bite, enjoy the inviting atmosphere, and let us make every moment special for you!
                    </h3>
                    <div className="flex gap-4">
                        <img src="/Border.png" alt="" className="lg:h-24 md:h-20 h-16" />
                        <div className="flex flex-col gap-2 justify-center">
                            <h2 className="lg:text-xl md:text-md text-sm text-white font-bold">Online Food Ordering</h2>
                            <p className="lg:text-md md:text-sm text-xs">Easy food ordering by browsing menu online.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <img src="/Border1.png" alt="" className="lg:h-24 md:h-20 h-16" />
                        <div className="flex flex-col gap-2 justify-center">
                            <h2 className="lg:text-xl md:text-md text-sm text-white font-bold">Healthy Food</h2>
                            <p className="lg:text-md md:text-sm text-xs">Eat a wide variety of nutritious healthy foods</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>

        <div className="w-full flex md:flex-row flex-col  justify-center items-center lg:px-20 md:px-8 px-6  lg:gap-24 gap-12">
            <div className="flex flex-col lg:gap-16 md:gap-12 gap-10   ">
                <h1 className="lg:text-5xl md:text-4xl text-2xl md:text-start text-center font-semibold font-fredoka">We Provide best Services</h1>

                <div className="flex flex-col gap-8">
                    <div className="flex lg:gap-16 md:gap-10 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col gap-2">
                            <img src="/Services1.png" alt="" className="lg:h-30 lg:w-30 md:h-24 md:w-24 h-16 w-16" />
                            <h2 className="lg:text-xl md:text-lg text-md font-semibold font-fredoka">Afternoon Tea</h2>
                            <p className="lg:text-sm md:text-xs text-xs text-gray-300">Relax and enjoy a selection of fine teas paired with delightful pastries and light snacks for a perfect afternoon break.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-2">
                            <img src="/Services2.png" alt="" className="lg:h-30 lg:w-30 md:h-24 md:w-24 h-16 w-16" />
                            <h2 className="lg:text-xl md:text-lg text-md font-semibold font-fredoka">Wine & Cocktails</h2>
                            <p className="lg:text-sm md:text-xs text-xs text-gray-300">Experience a variety of handcrafted cocktails and premium wines to complement your meal or unwind with friends.</p>
                        </motion.div>

                    </div>
                    <div className="flex lg:gap-16 md:gap-10 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-2">
                            <img src="/Services3.png" alt="" className="lg:h-30 lg:w-30 md:h-24 md:w-24 h-16 w-16" />
                            <h2 className="lg:text-xl md:text-lg text-md font-semibold font-fredoka">Live Music & Entertainment</h2>
                            <p className="lg:text-sm md:text-xs text-xs text-gray-300">Enhance your dining experience with live music performances and entertainment, creating the perfect ambiance for a great time.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-2">
                            <img src="/Services4.png" alt="" className="lg:h-30 lg:w-30 md:h-24 md:w-24 h-16 w-16" />
                            <h2 className="lg:text-xl md:text-lg text-md font-semibold font-fredoka">Alfresco Dining</h2>
                            <p className="lg:text-sm md:text-xs text-xs text-gray-300">Dine under the open sky with our outdoor seating, offering a refreshing and cozy atmosphere for a memorable experience.</p>
                        </motion.div>
                    </div>
                </div>

            </div>
            <img src="/Container.png" alt="" className="w-1/3 md:flex hidden" />
        </div>

        <motion.img
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            src="/Section.png" className="lg:pl-20 md:pl-12 pl-6 " />

        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col lg:gap-24 gap-12 justify-center items-center">
            <h1 className="lg:text-5xl md:text-4xl text-2xl font-semibold font-fredoka">Meet Our Experts</h1>
            <img src="/experts.png" alt="" className="lg:max-h-150 md:max-h-120 max-h-90" />
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col lg:gap-16 gap-12 justify-center items-center">
            <h1 className="lg:text-5xl md:text-4xl text-2xl font-semibold font-fredoka">A Collection Of Unique Experiences</h1>
            <img src="/experiences.png" alt="" className="lg:max-h-150 md:max-h-120 max-h-90" />
        </motion.div>

        <div className="text-center flex flex-col lg:gap-16 gap-12">
            <h1 className="lg:text-5xl md:text-4xl text-2xl font-semibold font-fredoka">Variety of Dishes</h1>

            <motion.img
                initial={{ x: 0, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }} // Increase width to 150%
                transition={{ duration: 0.8, delay: 0.3, origin: 1 }}
                viewport={{ once: true }}
                src="/food-banner.png"
                alt="Food Banner"
                className=" left-0 top-0"
                style={{ objectFit: "cover" }} // Ensure the image scales properly
            />
        </div>

        <div className="lg:mt-8 md:mt-6 mt-4">
            <Testimonials />
        </div>

    </motion.div>
}