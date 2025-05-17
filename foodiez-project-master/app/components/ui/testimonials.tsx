
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

export const testimonials = [
  {
    name: "John Doe",
    role: "Restaurant Owner",
    text: "Foodiez has transformed the way we manage our restaurant! The online ordering and table booking features are game-changers.",
    rating: 5,
  },
  {
    name: "Emily R.",
    role: "Food Enthusiast",
    text: "Ordering food has never been this easy! I love the intuitive menu and quick checkout process.",
    rating: 5,
  },
  {
    name: "Michael T.",
    role: "Restaurant Manager",
    text: "Managing reservations, orders, and menus in one place has saved us so much time. Highly recommend!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{once: true}}
      transition={{ duration: 1 }}
      className="bg-gray-900 text-white lg:py-16 lg:px-6 md:px-12 md:py-12 px-6 py-8 rounded-md lg:rounded-xl">
      <div className="text-center">
        <p className="text-sm font-bold text-yellow-500 uppercase">Features</p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">Why choose Foodiez?</h2>
        <p className="text-gray-400 lg:mt-6 md:mt-4 mt-2 lg:max-w-3xl max-w-2xl mx-auto lg:text-lg md:text-md text-xs">
          Foodiez makes restaurant management seamless with a user-friendly experience.
          Whether you are a restaurant owner or a customer, we offer a smooth and efficient dining experience.
        </p>
      </div>

      <div className="lg:mt-16 md:mt-12 mt-8 grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg relative">
            <FaQuoteLeft className="absolute md:-top-4 -top-2 left-4 text-yellow-500 lg:text-2xl md:text-xl text-lg" />
            <p className="text-gray-300 italic lg:text-lg text-sm">&quot;{testimonial.text}&quot;</p>
            <div className="mt-4 flex items-center gap-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
            </div>
            <p className="font-bold mt-2 lg:text-lg  text-sm">{testimonial.name}</p>
            <p className="text-gray-400  lg:text-md text-xs">{testimonial.role}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
