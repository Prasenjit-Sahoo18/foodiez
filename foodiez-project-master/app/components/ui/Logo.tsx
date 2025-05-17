import Link from "next/link";

export default function Logo() {
    return <Link href="/dashboard" style={{ fontFamily: "Montez" }} className="md:text-36 text-24 flex md:gap-2 gap-1 justify-center items-center">
        <img  src="/logo.png" alt="" className="lg:h-7 md:h-6 h-4" />
        <h1 className="lg:text-4xl md:text-3xl text-xl md:font-medium  md:tracking-tighter">Foodiez</h1>
    </Link>
}