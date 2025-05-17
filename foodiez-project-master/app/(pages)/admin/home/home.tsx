"use client";

import TypeCard from "@/app/components/ui/TypeCard";
import { useEffect, useState, useRef } from "react";
import { MenuItem, Type } from "@/app/config";
import { Session } from "next-auth";
import { motion, useAnimation, useInView } from "framer-motion";
import { useMenuItemsStore } from "@/store";
import AdminMenuCard from "@/app/components/ui/AdminMenuCard";
import { SearchIcon } from "@/app/components/ui/Icons";

type AdminHomeProps = {
  session?: Session;
  typesData: Type[];
  menuItemsData: MenuItem[];
};

export default function AdminHome({
  typesData,
  menuItemsData,
}: AdminHomeProps) {

  const [currentType, setCurrentType] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { menuItems, setItems } = useMenuItemsStore((state) => state);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // animation
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView])

  useEffect(() => {
    if (currentType == null) {
      setItems(menuItemsData);
    } else {
      let items: MenuItem[] = [];
      menuItemsData.map((item) => {
        if (item.typeName == currentType) {
          items = [...items, item];
        }
      });
      setItems(items);
    }
    setLoading(false);
  }, [currentType]);

  function browseMenu(searchItem: string) {
    searchItem = searchItem.trim();
    let foundItems;
    if (searchItem == "") {
      if (currentType == null) {
        foundItems = menuItemsData
      } else {
        foundItems = menuItemsData.filter(item => {
          return item.typeName === currentType;
        })
      }
    }
    else {
      foundItems = menuItemsData.filter(item => {
        return item.name.toLowerCase().includes(searchItem.toLowerCase());
      })
    }
    setItems(foundItems);
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full box-border flex flex-col lg:gap-24 md:gap-20 sm:gap-16 gap-12 m-0 p-0 overflow-hidden pt-10"
    >

      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-medium text-center bg-clip-text text-transparent bg-gradient-to-r  from-cyan-500 to-white via-cyan-100">
          Varieties
        </h1>
        <div className="relative flex justify-center items-center">
          <button
            className="hidden md:absolute left-4 top-1/3.5 z-10 transform -translate-y-1/2 bg-gray-300 font-bold text-xl text-black p-2 rounded-full cursor-pointer"
            onClick={scrollLeft}
          >
            &lt;
          </button>
          <motion.div
            ref={scrollContainerRef}
            className=" flex md:gap-8 gap-4 justify-start overflow-x-auto no-scrollbar overflow-hidden py-8 md:px-16 px-4 md:mr-16 mr-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {typesData &&
              typesData.map((type) => (
                <motion.div key={type.id} whileHover={{ scale: 1.02 }}>
                  <TypeCard
                    onClick={() => setCurrentType(type.name)}
                    img={type.image}
                    title={type.name}
                    description={type.description}
                  />
                </motion.div>
              ))}
            <motion.div whileHover={{ scale: 1.02 }}>
              <TypeCard
                onClick={() => setCurrentType(null)}
                key={0}
                img={"/all-items-image.jpg"}
                title={"All Items"}
                description={"Burgers, Pizzas, Paneer, Drinks, and more"}
              />
            </motion.div>
          </motion.div>
          <button
            className="hidden md:absolute right-4 text-xl top-1/3.5 font-bold transform -translate-y-1/2 bg-gray-300 text-black p-2 rounded-full cursor-pointer"
            onClick={scrollRight}
          >
            &gt;
          </button>
        </div>
      </div>

      <motion.div
        id="menu-section"
        className="Menu w-full flex flex-col px-8 lg:gap-12 md:gap-12 gap-10 justify-center items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="lg:text-4xl sm:text-4xl text-3xl font-medium text-center bg-clip-text text-transparent bg-gradient-to-r  from-cyan-500 to-white via-cyan-100">
          {currentType == null ? "All Items" : `${currentType}`}
        </h1>

        {/* Search bar */}
        <div className="relative w-full sm:max-w-2xl md:max-w-4xl mx-4 bg-indigo-800/20 ">
          <SearchIcon classname="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 md:h-5 h-4" />
          <input
            type="text"
            placeholder="Search the menu"
            className="border-gray-600 border-1 md:p-3 p-2 md:pl-13 pl-12 w-full rounded-full focus:outline-none focus:ring-2 focus:border-transparent focus:ring-blue-400 shadow-sm"
            onChange={(e) => browseMenu(e.target.value)}
          />
        </div>

        {menuItems.length === 0 ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="">No items found</div>
          </div>
        ) : (
          <motion.div className=" gap-9 lg:gap-y-28 md:gap-y-20 gap-y-10  w-full h-full py-10 flex flex-wrap justify-center items-center">
            {menuItems.map((item) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                key={item.id + Math.random()}
                whileHover={{  y:-10, boxShadow:"0px 10px 15px rgba(0, 0, 0, 0.3)" }}
                className="flex md:w-72 lg:w-63"
              >
                <AdminMenuCard
                  menuItem={item}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

    </motion.div>
  );
}