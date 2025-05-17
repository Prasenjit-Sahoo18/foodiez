"use client";

import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import React, { useState } from 'react'; // Ensure React is imported for type definitions
import { SendIcon } from "@/app/components/ui/Icons";

export default function Contact() {
    const [loading, setLoading]  = useState<boolean>(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) { // Updated type
        setLoading(true);
        e.preventDefault();
        const form = e.currentTarget; // Access form elements safely
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: "34597655-1f06-46b4-aa25-7a083c31700b",
                name: (form.elements.namedItem("name") as HTMLInputElement).value, // Access form fields
                email: (form.elements.namedItem("email") as HTMLInputElement).value,
                message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
            }),
        });
        const result = await response.json();
        if (result.success) {
            Swal.fire({
                title: "Success!",
                text: "Message sent successfully.",
                icon: "success"
            });
            console.log(result);
        } else {
            toast.error("Error while sending message!", {
                duration: 1200,
            });
        }
        setLoading(false);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex flex-col lg:gap-16 md:gap-10 gap-8 justify-center items-center lg:p-8 p-6">
            <h1 className="lg:text-4xl md:text-2xl text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-white via-cyan-200">
                Contact Us
            </h1>
            <form onSubmit={handleSubmit} className="w-full bg-gradient-to-b from-blue-950 to-violet-950 flex flex-col gap-8 justify-center items-center lg:max-w-130 md:max-w-115 max-w-100 lg:p-12 md:p-10 p-8 rounded-xl">
                <div className="flex flex-col gap-2 justify-center w-full lg:text-lg md:text-md text-sm">
                    <label htmlFor="name" className=" ">Name</label>
                    <input type="text" name="name" required placeholder="Your name" className="bg-gray-100/80 focus:bg-white text-black p-2 md:p-2.5 rounded-md lg:text-md md:text-sm text-xs" />
                </div>
                <div className="flex flex-col gap-2 justify-center w-full lg:text-lg md:text-md text-sm">
                    <label htmlFor="email" className="">Email</label>
                    <input type="email" name="email" required placeholder="email@example.com" className="bg-gray-100/80 focus:bg-white text-black p-2 md:p-2.5 rounded-md lg:text-md md:text-sm text-xs" />
                </div>
                <div className="flex flex-col w-full gap-2 justify-center lg:text-lg md:text-md text-sm">
                    <label htmlFor="message" className="">Message</label>
                    <textarea name="message" rows={5} placeholder="Enter Message" className="bg-gray-100/80 focus:bg-white text-black p-2 rounded-md lg:text-md md:text-sm text-xs"></textarea>
                </div>
                <button type="submit" className="lg:text-md text-sm w-full p-2 md:p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition transform flex justify-center items-center hover:scale-103 cursor-pointer">
                {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8H4z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
                <div className="flex gap-2 justify-center items-center lg:text-md text-sm">

                    Send Message
                    <SendIcon/>
                </div>
            )}
                </button>
            </form>
        </motion.div>
    );
}