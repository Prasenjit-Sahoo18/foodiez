import { ReactElement } from "react";

export default function NavbarTags({ title, icon, onClick }: { title: string, icon?:ReactElement, onClick?:()=>void }) {
    return <div onClick={onClick} className="flex left-0 lg:text-sm text-[14px] lg:gap-1.5 gap-3 justify-center items-center hover:bg-gray-600/40 hover:text-white text-gray-300  cursor-pointer p-2 px-3 rounded-md transition transform ease-in">
        {icon}
        <h3>{title}</h3>
    </div>
}