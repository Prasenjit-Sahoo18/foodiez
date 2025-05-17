"use client"

import Logo from "./Logo";
import ProfileButton from "./ProfileButton";
import NavbarTags from "./NavbarTags";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoginButton from "./LoginButton";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AboutIcon, CartIcon, ContactIcon, CrossIcon, HamburgerIcon, HomeIcon, MenuIcon, TableIcon } from "./Icons";
import { useEffect, useState } from "react";

export default function Navbar() {
    const session = useSession();
    const user = session.data ? session.data.user : null;
    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false);

    const isAdmin = user?.email === "admin@gmail.com" ? true : false

    // Monitor screen size and update `open` state
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setOpen(false); // Close the menu on large screens
            }
        };

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Initial check
        handleResize();

        // Clean up event listener
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function getMenuClasses() {
        let menuClasses = [];

        if (open) {
            menuClasses = [
                "flex",
                "text-xl",
                "flex-col",
                "gap-4",
                "absolute",
                "left-0",
                "w-full",
                "lg:hidden",
                "p-4 px-12",
                "top-[51px] md:top-13",
                " bg-gradient-to-b from-indigo-950/95 to-gray-950",
            ]
        }
        else {
            menuClasses.push("lg:flex hidden  gap-3 justify-center items-center")
        }

        return menuClasses.join(" ");
    }

    return <div className="w-full overflow-hidden  flex justify-between lg:px-20 md:px-8 px-4 lg:py-3 py-2 ">
        <Logo />
        <div className={getMenuClasses()}>
            <Link href="/dashboard"><NavbarTags title="Home" icon={<HomeIcon />} onClick={() => setOpen(false)} /></Link>
            <Link href="/about"><NavbarTags title="About" icon={<AboutIcon />} onClick={() => setOpen(false)} /></Link>
            <Link href="/dashboard#menu-section"><NavbarTags title="Menu" icon={<MenuIcon />} onClick={() => setOpen(false)} /></Link>
            <Link href="/contact"><NavbarTags title="Contact" icon={<ContactIcon />} onClick={() => setOpen(false)} /></Link>
            <div className="lg:flex hidden" onClick={() => {
                setOpen(false)
                if (!user) {
                    toast.error("Please login to see cart.", {
                        duration: 1200
                    })
                }
                else {
                    router.push("/cart")
                }
            }}><NavbarTags title="Cart" icon={<CartIcon />} /></div>

            <div className=" gap-2 cursor-pointer h-9 px-4  lg:mx-0 lg:border-2 lg:text-sm text-[14px] text-green-500 border-green-500 lg:hover:bg-green-500 hover:bg-green-500/60 flex justify-center items-center transition transform hover:text-white lg:rounded-3xl rounded-lg"
                onClick={() => {
                    setOpen(false)
                    if (!user) {
                        toast.error("Please login to book table.", {
                            duration: 1200
                        })
                    }
                    else {
                        router.push("/book")
                    }
                }}><TableIcon />
                <h4>Book A Table</h4></div>


            {user && <div className="hidden lg:block"><ProfileButton isAdmin={isAdmin} letter={user.name ? user.name[0].toUpperCase() : user.username[0].toUpperCase()} /></div>}
            {!user && <div className="hidden lg:flex"><Link href="/signin"><LoginButton /></Link></div>}
        </div>

        <div className="flex md:gap-3 gap-2 lg:hidden justify-center items-center">

            {user && <div onClick={() => {
                setOpen(false)
                if (!user) {
                    toast.error("Please login to see cart.", {
                        duration: 1200
                    })
                }
                else {
                    router.push("/cart")
                }
            }} className="lg:hidden block mr-2 text-gray-300 hover:text-green-500 cursor-pointer"><CartIcon /></div>}

            {user && <div className="lg:hidden block"><ProfileButton isAdmin={isAdmin} letter={user.name ? user.name[0].toUpperCase() : user.username[0].toUpperCase()} /></div>}

            {!user && <div className="lg:hidden flex"><Link href="/signin"><LoginButton classname="hover:underline" /></Link></div>}
            <button
                className="cursor-pointer p-2 hover:bg-gray-600/60 text-gray-400 rounded-md hover:text-white"
                onClick={() => setOpen(!open)}
            >
                {!open ? <HamburgerIcon /> : <CrossIcon />}
            </button>
        </div>
    </div>
}