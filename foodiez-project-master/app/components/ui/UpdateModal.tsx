"use client"

import { motion } from "framer-motion"
import { useMenuItemsStore, useUpdateItemStore, useUpdateModalStore } from "@/store";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function UpdateModal() {
    const closeModal = useUpdateModalStore((state) => state.closeModal)
    const { menuItems, setItems } = useMenuItemsStore((state) => state);
    const id = useUpdateItemStore(state => state.id)

    interface UpdateItemData {
        id: string;
        name?: string;
        description?: string;
        imageUrl?: string;
        price?: number;
        typeName?: string;
    }

    interface ApiResponse {
        data: boolean;
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            name: { value: string };
            description: { value: string };
            imageUrl: { value: string };
            price: { value: string };
            typeName: { value: string };
        };

        if (!id) {
            toast.error("Invalid item ID!", {
                duration: 1200

            });
            return;
        }

        const data: UpdateItemData = {
            id: id,
            name: target.name.value || undefined,
            description: target.description.value || undefined,
            imageUrl: target.imageUrl.value || undefined,
            price: target.price.value ? parseInt(target.price.value) : undefined,
            typeName: target.typeName.value || undefined,
        };

        const response = await axios.put<ApiResponse>(`/api/menu`, data);
        const result = response.data;

        if (result) {
            const updatedMenuItems = menuItems.map((item) =>
                item.id === id
                    ? {
                        id: data.id || item.id,
                        name: data.name || item.name,
                        description: data.description || item.description,
                        price: data.price || item.price,
                        typeName: data.typeName || item.typeName,
                        imageUrl: data.imageUrl || item.imageUrl,
                    }
                    : item
            );
            setItems(updatedMenuItems);

            Swal.fire({
                title: "Success!",
                text: "Item updated successfully.",
                icon: "success",
            });

            closeModal();
        } else {
            toast.error("Error while updating item!", {
                duration: 1200

            });
        }
    }

    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ fontFamily: "DM Sans" }}
        className="fixed inset-0 flex items-center justify-center   bg-opacity-90 backdrop-filter backdrop-blur-lg">
        <div className="bg-gradient-to-b from-gray-600 to-sky-950  rounded-xl shadow-md shadow-gray-700 w-80 text-center text-white flex flex-col min-w-124 w-fit">

            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-blue-900 to-violet-950 w-full h-full flex flex-col gap-8 justify-center items-center w-1/3 p-12 rounded-xl ">
                <h1 className="text-3xl font-semibold text-green-300">Update</h1>


                <div className="flex flex-col gap-2 justify-center w-full">
                    <input type="text" name="name" placeholder="Name of the item" className="bg-gray-100 text-black p-2 px-3 rounded-md" />
                </div>
                <div className="flex flex-col gap-2 justify-center w-full">
                    <input type="text" name="description" placeholder="Description" className="bg-gray-100 text-black p-2 px-3 rounded-md" />
                </div>
                <div className="flex flex-col w-full gap-2 justify-center">
                    <input type="number" name="price" placeholder="Price" className="bg-gray-100 text-black p-2 px-3 rounded-md" />
                </div>
                <div className="flex flex-col w-full gap-2 justify-center">
                    <input type="text" name="imageUrl" placeholder="Image Url" className="bg-gray-100 text-black p-2 px-3 rounded-md" />
                </div>
                <div className="flex flex-col w-full gap-2 justify-center">
                    

                    <select defaultValue="" required name="type" id="typeName" className="bg-gray-100 text-gray-500 w-full rounded-md flex py-2 px-2 cursor-pointer">
                        <option value="" disabled  hidden>Type</option>
                        <option value="Fast Food">Fast Food</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Appetizers">Appetizers</option>
                        <option value="Healthy Options">Healthy Options</option>
                        <option value="Seafood">Seafood</option>
                    </select>
                </div>
                <button type="submit" className="w-full p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition transform flex justify-center items-center hover:scale-105 cursor-pointer">Update Item</button>
                <button onClick={closeModal} className="w-full p-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition transform flex justify-center items-center hover:scale-105 cursor-pointer">Close</button>
            </form>
        </div>
    </motion.div>
}
