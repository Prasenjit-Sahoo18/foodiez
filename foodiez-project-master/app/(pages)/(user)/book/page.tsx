"use client";

import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Contact() {
  const [minDate, setMinDate] = useState('');
  const [minTime, setMinTime] = useState('');
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    const now = new Date();
    const isoString = now.toISOString();
    setMinDate(isoString.split('T')[0]);
    setMinTime(isoString.split('T')[1].slice(0, 5));
  }, []);

  interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    guests: HTMLInputElement;
    phone: HTMLInputElement;
    date: HTMLInputElement;
    time: HTMLInputElement;
  }

  interface FormWithElements extends HTMLFormElement {
    elements: FormElements;
  }

  async function handleSubmit(e: React.FormEvent<FormWithElements>) {
    e.preventDefault();

    const form = e.currentTarget.elements;

    if (form.phone.value.length !== 10) {
      setPhoneError(true);
      return;
    }
    setLoading(true);
    const response = await axios.post(`/api/book`, {
      name: form.name.value,
      guests: parseInt(form.guests.value),
      phone: parseFloat(form.phone.value),
      date: form.date.value,
      time: form.time.value,
    });

    setLoading(false);
    if (response.data) {
      Swal.fire({
        title: "Success!",
        text: "Table booked successfully.",
        icon: "success",
      });
    } else {
      toast.error("Error while booking table!", {
        duration: 1200,
      });
    }
  }

  return (
    <div className='flex flex-col lg:gap-8 gap-4 w-full lg:p-8 md:p-6 p-4 overflow-x-hidden justify-center items-center'>
      <h1 className="lg:text-4xl md:text-3xl text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r text-center w-full  from-cyan-500 to-white via-cyan-200 ">
        Book A Table
      </h1>

      <div className='flex w-full justify-center items-center lg:max-w-400 md:max-w-180 max-w-130'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col gap-8 lg:p-8 md:p-6 p-2"
        >
          <form onSubmit={handleSubmit} className="lg:text-md text-sm flex flex-col lg:gap-12 md:gap-8 gap-6 justify-center items-center  lg:p-12 md:p-8 p-4 rounded-xl w-full">
            <div className="flex flex-col gap-2 justify-center w-full">
              <input type="number" name="guests" required placeholder="Number of guest" className="border-3 border-gray-400 bg-gray-900 text-md  text-gray-100 md:px-4 md:py-3 px-3 py-2 rounded-md" />
            </div>
            <div className='flex md:flex-row flex-col md:gap-4 gap-6 w-full '>
              <div className="flex flex-col gap-2 justify-center w-full">
                <input type="text" name="name" required placeholder="Full Name" className="w-full border-3 border-gray-400 bg-gray-900   text-gray-100 md:px-4 md:py-3 px-3 py-2 rounded-md" />
              </div>
              <div className="flex flex-col gap-2 justify-center w-full">
                <input type="text" name="phone" onChange={()=>setPhoneError(false)} required placeholder="Phone No" className="border-3 border-gray-400 bg-gray-900   text-gray-100 md:px-4 md:py-3 px-3 py-2 rounded-md" />
                {phoneError && <p className='text-red-500'>Please enter a vaild number.</p>}
              </div>
            </div>
            <div className='flex md:flex-row flex-col md:gap-4 gap-6 w-full'>
              <div className="flex flex-col gap-2 justify-center w-full">
                <input type="date" name="date" required placeholder="Date" className="border-3 border-gray-400 bg-gray-900   md:text-gray-300/80 text-gray-100 md:px-4 md:py-3 px-3 py-2 rounded-md" min={minDate} />
              </div>
              <div className="flex flex-col gap-2 justify-center w-full">
                <input type="time" name="time" required placeholder="Time" className="border-3 border-gray-400 bg-gray-900   md:text-gray-300/80 text-gray-100 md:px-4 md:py-3 px-3 py-2 rounded-md" min={minTime} />
              </div>
            </div>

            <button type="submit" className="w-full md:px-2 md:py-3 py-2 md:font-semibold font-medium  bg-blue-600 rounded-lg hover:bg-blue-700 transition transform flex justify-center items-center hover:scale-105 cursor-pointer">
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
                Booking Table...
              </>
            ) : (
              "Book Table"
            )}</button>
          </form>
        </motion.div>
        <motion.div>
          <img src="/book-table2.png" alt="" className='w-400 lg:flex hidden' />
        </motion.div>
      </div>
    </div>
  );
}
