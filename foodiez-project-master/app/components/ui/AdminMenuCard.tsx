"use client"

import { MenuItem } from "@/app/config";
import { useMenuItemsStore, useUpdateItemStore, useUpdateModalStore } from "@/store";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion"

export default function AdminMenuCard({ menuItem }: { menuItem: MenuItem }) {
  const { menuItems, setItems } = useMenuItemsStore(state => state);
  const openModal = useUpdateModalStore(state => state.openModal)
  const setId = useUpdateItemStore(state => state.setId)



  async function updateItem() {
    setId(menuItem.id);
    openModal();
  }


  async function deleteItem(id: string) {

    const response = await axios.delete(`/api/menu`, {
      data: {
        id
      }
    })
    console.log(response.data);

    if (response) {
      const newMenuItems = menuItems.filter(item => item.id != id);
      setItems(newMenuItems);
      // toast.success("Item removed successfully.", {
      //   duration: 700,
      // })
    }
    else {
      // toast.error("Error while removing item!", {
      //   duration: 1200
      // })
    }
  }
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col md:gap-4 gap-2 bg-gradient-to-b from-gray-500/80 to-purple-1000/70 md:rounded-2xl rounded-xl md:pb-0 pb-4 hover:bg-blue-900/30 hover:cursor-pointer sm:h-72 w-68 md:w-full md:h-full">
      <img src={menuItem.imageUrl} alt="Image" className="md:h-32 h-28  rounded-t-xl" />
      <div className="flex flex-col justify-between md:gap-6 gap-4 h-full px-4 pb-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center ">
            <h2 className="lg:text-xl md:text-lg text-md font-semibold flex flex-wrap">{menuItem.name}</h2>
            <h2 className=" text-sm text-blue-300 font-medium font-sans flex flex-nowrap">&#8377; {menuItem.price}</h2>
          </div>
          <h4 className="text-xs text-gray-300">{menuItem.description}</h4>
        </div>
        <div className="flex gap-4 w-full justify-center text-sm">
          {/* <h2 className="text-xl flex gap-1 text-md justify-center items-center font-sans text-blue-300 font-semibold"><p className="">&#8377; </p> {menuItem.price}</h2> */}
          <button onClick={updateItem} className="bg-green-600 w-full py-2 rounded-md text-white cursor-pointer hover:bg-green-700">Update item</button>
          <button onClick={() => {
            toast.promise(deleteItem(menuItem.id), {
              loading: <b>Deleting...</b>,
              success: <b>Item removed successfully</b>,
              error: <b>Could not delete. Please try again.</b>,

            }, {
              success: {
                duration: 900
              }
            });
          }} className="bg-red-500 w-full py-2 rounded-md text-white cursor-pointer hover:bg-red-600">Delete item</button>
        </div>

      </div>
    </motion.div>
  );
}

{/* <div className="flex gap-4 w-full justify-center">
    <button onClick={updateItem} className="bg-green-600 w-full py-1 rounded-lg text-white cursor-pointer hover:bg-green-700">Update item</button>
    <button onClick={()=>deleteItem(menuItem.id)} className="bg-red-500 w-full py-2 rounded-lg text-white cursor-pointer hover:bg-red-600">Delete item</button>
</div> */}