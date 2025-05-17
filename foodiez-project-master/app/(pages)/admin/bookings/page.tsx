"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Loader2 from "@/app/components/ui/Loader2";

interface Table {
  id: string;
  userId: string;
  name: string;
  phone: number;
  guests: number;
  date: string;
  time: string;
  createdAt: string
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Table[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get("/api/book");
        const data = response.data;
        setBookings(data);
        setLoading(false);
      } catch (e) {
        setError(true);
        console.log(error)
        console.log(e);
      }
    }
    fetchBookings();
  }, []);

  return (
    <div className="flex flex-col justify-left  w-full lg:px-4 md:px-4 px-4 lg:gap-6 md:gap-4 gap-2 items-center lg:mt-12 md:mt-8 mt-6  ">
      <h1 className="lg:text-4xl md:text-3xl text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r  from-cyan-500 to-white via-cyan-200 ">
        Bookings
      </h1>
      <br />

      {loading ? (
        <Loader2 />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex w-full lg:gap-10 md:gap-8 gap-6 flex-wrap justify-center">
          {bookings.length > 0 ? (
            bookings.map((table: Table) => (
              <div key={table.id} className="flex flex-col gap-8  lg:p-6 md:p-6 p-4 w-[460px] bg-gradient-to-br from-sky-950 to-violet-900/80 via-indigo-950  shadow-md md:rounded-lg rounded-md h-fit">
                <div className="flex flex-col gap-2">
                  <div className="lg:text-lg md:text-lg text-sm md:font-semibold gont-medium text-green-500 flex flex-wrap gap-2 items-center">Booking ID: <h3 className="text-white lg:text-[14px] md:text-md text-xs font-normal">{table.id}</h3></div>
                  <div className="lg:text-[15px] md:text-sm text-xs text-yellow-300/80 flex gap-2">
                    Created At: <h3 className="text-white">{new Date(table.createdAt).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}</h3>
                  </div>
                  <div className="lg:text-[15px] md:text-sm text-xs text-blue-300 flex gap-2">
                    Name: <h3 className="text-white">{table.name}</h3>
                  </div>
                  <div className="lg:text-md md:text-sm text-xs text-gray-400 flex gap-2">
                    Guests: <h3 className="text-white">{table.guests.toString()}</h3>
                  </div>
                  <div className="lg:text-md md:text-sm text-xs text-gray-400 flex gap-2">
                    Phone: <h3 className="text-white">{table.phone.toString()}</h3>
                  </div>
                  <div className="lg:text-md md:text-sm text-xs text-gray-400 flex gap-2">
                    Date: <h3 className="text-white">{new Date(table.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}</h3>
                  </div>
                  <div className="lg:text-md md:text-sm text-xs text-gray-400 flex gap-2">
                    Time: <h3 className="text-white">{table.time}</h3>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No bookings found</div>
          )}
        </motion.div>
      )}
    </div>
  );
}