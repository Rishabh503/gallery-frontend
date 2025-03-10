import { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const months = [
  { name: "August", monthNumber: "08", year: 2023, value: "August 2023" },
  { name: "September", monthNumber: "09", year: 2023, value: "September 2023" },
  { name: "October", monthNumber: 10, year: 2023, value: "October 2023" },
  { name: "November", monthNumber: 11, year: 2023, value: "November 2023" },
  { name: "December", monthNumber: 12, year: 2023, value: "December 2023" },
  { name: "January", monthNumber: "01", year: 2024, value: "January 2024" },
  { name: "February", monthNumber: "02", year: 2024, value: "February 2024" },
  { name: "March", monthNumber: "03", year: 2024, value: "March 2024" },
  { name: "April", monthNumber: "04", year: 2024, value: "April 2024" },
  { name: "May", monthNumber: "05", year: 2024, value: "May 2024" },
  { name: "June", monthNumber: "06", year: 2024, value: "June 2024" },
  { name: "July", monthNumber: "07", year: 2024, value: "July 2024" },
  { name: "August", monthNumber: "08", year: 2024, value: "August 2024" },
  { name: "September", monthNumber: "09", year: 2024, value: "September 2024" },
  { name: "October", monthNumber: 10, year: 2024, value: "October 2024" },
  { name: "November", monthNumber: 11, year: 2024, value: "November 2024" },
  { name: "December", monthNumber: 12, year: 2024, value: "December 2024" },
  { name: "January", monthNumber: "01", year: 2025, value: "January 2025" },
  { name: "February", monthNumber: "02", year: 2025, value: "February 2025" },
  { name: "March", monthNumber: "03", year: 2025, value: "March 2025" }
];

export function Months() {
  const navigate = useNavigate();

  const handleMonthClick = (month) => {
    navigate(`/month/${month.year}-${month.monthNumber}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-12">
      <h1 className="text-6xl font-extrabold text-rose-700 mb-12 tracking-wide">Romantic Calendar</h1>
      <div className="grid sm:grid-cols-4 gap-8 w-full max-w-5xl p-6 bg-white shadow-lg rounded-3xl border border-rose-200">
        {months.map((month, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-6 flex items-center justify-center rounded-2xl text-rose-900 font-semibold shadow-md bg-gradient-to-r from-rose-100 to-rose-200 border border-rose-300 hover:from-rose-200 hover:to-rose-300 transition-all duration-300 text-lg w-full"
            onClick={() => handleMonthClick(month)}
          >
            <FaHeart className="mr-3 text-rose-600 text-xl" /> {month.value}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
