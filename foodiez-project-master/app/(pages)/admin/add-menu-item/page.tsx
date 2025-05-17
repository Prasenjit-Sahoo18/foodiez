"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function AddMenuItem() {
  const [loading, setLoading] = useState<boolean>(false);
  const session = useSession();

  if (!session || session.data?.user.email !== "admin@gmail.com") {
    redirect("/dashboard");
  }

  interface MenuItemData {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    typeName: string;
  }

  interface FormEventTarget extends EventTarget {
    name: { value: string };
    description: { value: string };
    price: { value: string };
    image: { value: string };
    type: { value: string };
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();

    const target = e.target as FormEventTarget;

    const data: MenuItemData = {
      name: target.name.value,
      description: target.description.value,
      price: parseInt(target.price.value),
      imageUrl: target.image.value,
      typeName: target.type.value,
    };

    try {
      const response: Response = await fetch("/api/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      setLoading(false);
      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Menu item added successfully.",
          icon: "success",
        });
      } else {
        toast.error("Error while adding menu item!", {
          duration: 1200
        });
      }
    } catch (error: unknown) {
      console.error("Error submitting form:", error);
      toast.error("Error while sending request!", {
        duration: 1200
      });
    }
  }

  return (
    <div className="w-full h-full flex flex-col lg:gap-16 md:gap-10 gap-8 justify-center items-center lg:p-8 p-6">
      <h1 className="lg:text-4xl md:text-2xl text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-white via-cyan-200">
        Add items
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full bg-gradient-to-b from-blue-950 to-violet-950 flex flex-col gap-8 justify-center items-center lg:max-w-150 md:max-w-140 max-w-120 lg:p-12 md:p-10 p-8 rounded-xl"
      >
        <div className="flex flex-col gap-2 justify-center w-full lg:text-lg md:text-md text-sm">
          <label htmlFor="name" className="text-lg">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Name of the item"
            className="bg-gray-100 focus:bg-white text-black p-2 md:p-2.5 rounded-md lg:text-md md:text-sm text-xs"
          />
        </div>
        <div className="flex flex-col gap-2 justify-center w-full lg:text-lg md:text-md text-sm">
          <label htmlFor="description" className="text-lg">
            Description
          </label>
          <input
            type="text"
            name="description"
            required
            placeholder="Description"
            className="bg-gray-100 focus:bg-white text-black p-2 md:p-2.5 rounded-md lg:text-md md:text-sm text-xs"
          />
        </div>
        <div className="flex flex-col gap-2 justify-center w-full lg:text-lg md:text-md text-sm">
          <label htmlFor="price" className="text-lg">
            Price
          </label>
          <input
            name="price"
            type="number"
            step="0.01"
            required
            placeholder="Enter Price"
            className="bg-gray-100 focus:bg-white text-black p-2 md:p-2.5 rounded-md lg:text-md md:text-sm text-xs"
          />
        </div>
        <div className="flex flex-col gap-2 justify-center w-full lg:text-lg md:text-md text-sm">
          <label htmlFor="image" className="text-lg">
            Image
          </label>
          <input
            name="image"
            type="text"
            required
            placeholder="Image url"
            className="bg-gray-100 focus:bg-white text-black p-2 md:p-2.5 rounded-md lg:text-md md:text-sm text-xs"
          />
        </div>
        <div className="flex flex-col gap-2 justify-center w-full lg:text-md md:text-md text-sm">
          <label htmlFor="type" className="text-lg">
            Type
          </label>

          <select name="type" id="type" className="bg-gray-100 focus:bg-white text-black p-2 md:p-2.5 rounded-md lg:text-md md:text-sm text-xs cursor-pointer">
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
        <button
          disabled={loading}
          type="submit"
          className="w-full p-2 mt-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition transform flex justify-center items-center hover:scale-103 cursor-pointer"
        >
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
              Adding Item...
            </>
          ) : (
            "Add Item"
          )}
        </button>
      </form>
    </div>
  );
}