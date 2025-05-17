import { MenuItem } from "@/app/config";
import AddIcon from "./AddIcon";
import { CartIcon } from "./Icons";
import {motion} from "framer-motion"

export default function MenuCard({ menuItem, onClick }: { menuItem: MenuItem; onClick?: () => void }) {
  return (
    <motion.div  whileHover={{scale:1.02}} className="flex flex-col md:gap-4 gap-2 bg-gradient-to-b from-gray-500/80 to-purple-1000/70 md:rounded-2xl rounded-xl md:pb-0 pb-4 hover:bg-blue-900/30 hover:cursor-pointer sm:h-72 w-68 md:w-full md:h-full">
      <img src={menuItem.imageUrl} alt="Image" className="md:h-32 h-28  rounded-t-xl" />
      <div className="flex flex-col justify-between md:gap-6 gap-4 h-full px-5 ">
        <div className="flex flex-col gap-2"> 
          <div className="flex justify-between items-center">
            <h2 className="lg:text-xl md:text-lg text-md font-semibold">{menuItem.name}</h2>
            <h2 className="md:hidden text-sm text-blue-300 font-medium font-sans">&#8377; {menuItem.price}</h2>
          </div>
          <h4 className="text-xs text-gray-300">{menuItem.description}</h4>
        </div>
        <div className="hidden md:flex justify-between items-center">
          <h2 className="text-xl flex gap-1 text-md justify-center items-center font-sans text-blue-300 font-semibold"><p className="">&#8377; </p> {menuItem.price}</h2>
          <AddIcon onClick={onClick} />
        </div>
        <div className="w-full ">
          <motion.button onClick={onClick} whileTap={{scale:0.9}} className="cursor-pointer w-full flex gap-2 justify-center items-center bg-gradient-to-r from-green-500/80 to-green-700/80 hover:from-green-500 hover:to-green-700 transition-all transform rounded-md text-xs font-semibold py-2 md:hidden">
            <CartIcon/>
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}