'use client';

import axios from "axios";
import { useAnimation, useInView, motion } from "motion/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { SignIcon } from "../ui/Icons";

export default function Signup() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [googleLoading, setGoogleLoading] = useState<boolean>(false);

    // animation
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView])

    // Error states
    const [emailError, setEmailError] = useState<string | null>(null);
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const router = useRouter();

    function validateInputs() {
        let isValid = true;

        if (!email) {
            setEmailError("Email is required");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Invalid email format");
            isValid = false;
        } else {
            setEmailError(null);
        }

        if (!username) {
            setUsernameError("Username is required");
            isValid = false;
        } else {
            setUsernameError(null);
        }

        if (!password) {
            setPasswordError("Password is required");
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            isValid = false;
        } else {
            setPasswordError(null);
        }

        return isValid;
    }

    function signup() {
        if (!validateInputs()) {
            return;
        }

        try {
            setLoading(true);
            axios.post(`${process.env.BACKEND_URL}/api/auth/signup`, {
                email,
                password,
                username
            }).then(response => {
                const data = response.data as { message: string };
                if (data.message == "User signed up successfully.") {
                    router.push("/signin");
                    toast.success("Signup successful", {
                        duration: 700,
                    })
                } else {
                    toast.error(data.message, {
                        duration: 1200,
                    });
                }
                setLoading(false);
            });
        } catch {
            toast.error("Signup failed. Please try again.", {
                duration: 1200,
            });
            setLoading(false);
        }
    }

    function signupWithGoogle() {
        setGoogleLoading(true);
        signIn('google', {
            callbackUrl: `/dashboard`
        }).then(() => setGoogleLoading(false));
    }

    return (
        <div ref={ref} className="font-dmsans overflow-hidden flex min-h-screen w-screen items-center justify-between lg:bg-gray-800 bg-gray-1000" >
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 0 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="h-screen lg:w-1/2 lg:flex hidden">
                <img src="/signup-image.jpg" alt="Signup Image" className="h-full w-full lg:flex hidden" />
            </motion.div>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0.1 }} 
      className="lg:w-1/2 lg:max-w-1/2  w-full md:max-w-160 max-w-120 flex flex-col lg:gap-14 md:gap-10 gap-8  justify-center  text-white lg:py-8 md:py-14 md:mx-10 mx-2 lg:mx-0 py-10 px-6 lg:px-36 md:px-20  lg:shadowr-2xl items-center bg-slate-600/30 lg:bg-transparent  rounded-xl ">

                <div className="flex flex-col lg:gap-2 md:gap-1 gap-0.5 mb-4">
                    <div className="flex gap-2 justify-center items-center lg:text-4xl md:text-3xl text-2xl font-semibold text-center">
                        Create Account on <h1 className="font-montez text-yellow-900 font-medium lg:text-5xl md:text-5xl text-4xl">Foodiez</h1>
                    </div>
                    <p className="text-center text-gray-300 ;g:text-md md:text-sm text-xs">Join us and order delicious food effortlessly.</p>
                </div>

                <div className="space-y-5 lg:max-w-full md:max-w-140 max-w-100 md:gap-2 gap-1 flex flex-col w-full px-2 md:px-0">
                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                        <h2 className="lg:text-lg md:text-md text-sm">Email</h2>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="john@gmail.com"
                            className={`w-full p-3 lg:h-11 md:h-10.5 h-10 lg:text-md md:text-sm text-[13px] text-black border bg-gray-200 focus:bg-white ${emailError ? "border-red-500" : "border-gray-300"
                                } lg:rounded-xl md:rounded-lg rounded-md shadow-sm focus:outline-none focus:ring-2 ${emailError ? "focus:ring-red-500" : "focus:ring-blue-500"
                                } focus:border-transparent`}
                            disabled={loading}
                        />
                        {emailError && <p className="text-red-500 md:text-sm text-xs">{emailError}</p>}
                    </div>

                    {/* Username Input */}
                    <div className="flex flex-col gap-2">
                        <h2 className="lg:text-lg md:text-md text-sm">Username</h2>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="John"
                            className={`w-full p-3 lg:h-11 md:h-10.5 h-10 lg:text-md md:text-sm text-[13px] text-black border bg-gray-100 ${usernameError ? "border-red-500" : "border-gray-300"
                                } lg:rounded-xl md:rounded-lg rounded-md shadow-sm focus:outline-none focus:ring-2 ${usernameError ? "focus:ring-red-500" : "focus:ring-blue-500"
                                } focus:border-transparent`}
                            disabled={loading}
                        />
                        {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col gap-2">
                        <h2 className="lg:text-lg md:text-md text-sm">Password</h2>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="john123"
                            className={`w-full p-3 lg:h-11 md:h-10.5 h-10 lg:text-md md:text-sm text-[13px] text-black border bg-gray-100 ${passwordError ? "border-red-500" : "border-gray-300"
                                } lg:rounded-xl md:rounded-lg rounded-md shadow-sm focus:outline-none focus:ring-2 ${passwordError ? "focus:ring-red-500" : "focus:ring-blue-500"
                                } focus:border-transparent`}
                            disabled={loading}
                        />
                        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full md:max-w-140 max-w-100 lg:text-md md:text-sm text-xs">


                <div className="flex flex-col gap-2 px-2 md:px-0">
                    <button
                        onClick={signup}
                        className={`cursor-pointer w-full flex justify-center items-center bg-yellow-900 text-black py-3 lg:rounded-xl md:rounded-lg rounded-md font-semibold transition-all ${loading ? "bg-blue-400 cursor-not-allowed" : "hover:bg-yellow-500 shadow-lg transform hover:scale-[1.02]"
                            }`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-black"
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
                                Creating Account...
                            </>
                        ) : (
                            <div className="flex justify-center items-center lg:gap-1.5 gap-1">

                            <h1>Sign Up</h1>
                            <SignIcon classname="md:h-4.5 lg:h-5 h-3.5"/>
                            </div>
                        )}
                    </button>
                    <p className="text-center">
                        Already have an account?{" "}
                        <a href="/signin" className="text-blue-300 lg:font-semibold font-medium hover:underline">Sign in</a>
                    </p>

                    <h1 className="text-center lg:font-semibold font-medium text-gray-200 text-md">Or</h1>

                    <div>

                        <button
                            onClick={signupWithGoogle}
                            className={`cursor-pointer w-full flex justify-center items-center bg-blue-600 text-white py-3 lg:rounded-xl md:rounded-lg rounded-md  transition-all ${googleLoading ? "bg-blue-400 cursor-not-allowed" : "hover:bg-blue-700 shadow-lg transform hover:scale-[1.02]"
                                }`}
                            disabled={googleLoading}
                        >
                            {googleLoading ? (
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
                                    Creating Account...
                                </>
                            ) : (
                                <div className="flex gap-2 items-center justify-center font-semibold">
                                    <img src="/google.png" alt="Google Icon" className="lg:h-5 lg:w-5 md:h-4 md:w-4 h-3.5 w-3.5 lg:mr-2 md:mr-1 mr-0.5" />
                                    Sign Up with Google
                                </div>
                            )}
                        </button>
                    </div>
                </div>
                </div>
            </motion.div>
        </div>
    );
}
