"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import OrderItem from "@/app/components/ui/OrderItem";
import Loader2 from "@/app/components/ui/Loader2";

interface OrderItem {
  id: string;
  menuItemId: string;
  quantity: number;
  menuItem: {
    name: string;
    imageUrl: string;
    price: number;
  };
}

interface Order {
  id: string;
  orderId: string;
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get("/api/orders");
        const data2 = await response.data;
        console.log("Data in orderHistory page: ", data2);
        const data = data2.filter((item: { status: string; }) => item.status !== "pending");
        setOrders(data);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching orders:", e);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col justify-left  w-full lg:px-4 md:px-4 px-4 gap-6 items-center  lg:mt-12 md:mt-8 mt-6 ">
      <h1 className="lg:text-4xl md:text-3xl text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r  from-cyan-500 to-white via-cyan-200 ">
        Order History
      </h1>
      <br />

      {loading ? (
        <Loader2/>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex w-full lg:gap-12 md:gap-10 gap-8 flex-wrap justify-center items-start"
        >
          {orders.length > 0 ? (
            orders.map((order: Order, index) => (
              <OrderItem key={index}  order={order}/>
            ))
          ) : (
            <div>No orders found</div>
          )}
        </motion.div>
      )}
    </div>
  );
}