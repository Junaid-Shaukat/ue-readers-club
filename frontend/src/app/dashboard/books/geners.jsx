'use client';
import { motion } from "framer-motion";

import { FaNewspaper } from "react-icons/fa6";
import { GiBookmark, GiBookshelf, GiDramaMasks, GiHeartInside, GiMagnifyingGlass, GiRocketFlight, GiSpellBook } from "react-icons/gi";
const genres = [
    { name: "Fiction", icon: <GiSpellBook /> },
    { name: "Non-Fiction", icon: <FaNewspaper /> },
    { name: "Mystery", icon: <GiMagnifyingGlass /> },
    { name: "Sci-Fi", icon: <GiRocketFlight /> },
    { name: "Romance", icon: <GiHeartInside /> },
    { name: "Drama", icon: <GiDramaMasks /> },
    { name: "Biography", icon: <GiBookmark /> },
    { name: "History", icon: <GiBookshelf /> },
  ];
  


const Genres = () => {
  return (
    <div><section className="mb-12">
    <h1 className="text-2xl text-center p-3 font-bold mb-4 text-gray-800">
      ALL Genres
    </h1>
    <div className="grid grid-cols-2 mx-9 sm:grid-cols-4 md:grid-cols-8 gap-4">
      {genres.map((genre, index) => (
        <motion.div
          key={genre.name}
          className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1, delay: index * 0.1 }}
        >
          <div className="text-4xl mb-2 text-green-600 mx-auto">
            {genre.icon}
          </div>
          <h3 className="text-sm font-medium">{genre.name}</h3>
        </motion.div>
      ))}
    </div>
    </section></div>
  )
}
export default Genres