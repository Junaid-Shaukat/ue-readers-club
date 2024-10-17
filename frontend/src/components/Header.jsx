"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaBook,
  FaNewspaper,
  FaMagnifyingGlass,
  FaRegHeart,
  FaHeart,
  FaArrowRightLong,
} from "react-icons/fa6";
import {
  GiMagnifyingGlass,
  GiSpellBook,
  GiDramaMasks,
  GiRocketFlight,
  GiHeartInside,
  GiBookshelf,
  GiBookmark,
} from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import { Button } from "./ui/button";

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

const trendingBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    image:
      "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    image:
      "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "The Invisible Life ",
    author: "V.E. Schwab",
    image:
      "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Project Hail Mary",
    author: "Andy Weir",
    image:
      "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    title: "The Four Winds",
    author: "Kristin Hannah",
    image:
      "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const upcomingBooks = [
  {
    id: 1,
    title: "New Dawn",
    author: "John Doe",
    image: "https://images.unsplash.com/photo-1607473129014-0afb7ed09c3a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    releaseDate: "October 20, 2024",
  },
  {
    id: 2,
    title: "Life of Stars",
    author: "Jane Smith",
    image: "https://images.unsplash.com/photo-1607473129014-0afb7ed09c3a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    releaseDate: "November 5, 2024",
  },
];

const buttonStyle = {
    fontSize: "0.875rem",
    padding: "0.5rem 1rem",
  };
const Header = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((bookId) => bookId !== id) : [...prev, id]
    );
  };

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 mt-4 text-center">
          <motion.h1
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to UE Readers Club
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover your next favorite book with our community of readers
          </motion.p>
        </section>

        <section className="mb-12">
          <h1 className="text-2xl text-center p-3 font-bold mb-4 text-gray-800">
            Explore Genres
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
        </section>
        {/* Trending now section  */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center justify-center  text-gray-800 flex items-center">
            <BsStars className="mr-2 text-yellow-400" /> Trending Now
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {trendingBooks.map((book, index) => (
              <motion.div
                key={book.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Image
                  src={book.image}
                  alt={book.title}
                  width={300}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                  <p className="text-gray-600 text-sm">{book.author}</p>
                  <button
                    onClick={() => toggleFavorite(book.id)}
                    className="mt-2 absolute right-4 bottom-[69px] text-green-600 hover:text-green-800 transition-colors duration-300"
                  >
                    {favorites.includes(book.id) ? (
                      <FaHeart className="text-red-600" />
                    ) : (
                      <FaRegHeart className="text-red-600" />
                    )}
                  </button>
                </div>
                <Link href="/dashboard">
                <Button      className=" ml-3 mt-5 mb-4 " variant="outline">Read More</Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
        <div className="flex justify-center items-center ">
  <Link href="/dashboard/books">
    <Button
      className="bg-gradient-to-r ml-3 mt-5 mb-4 pb-5  from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700"
      style={buttonStyle}
    >
        View All Books 
        <FaArrowRightLong className="m-1 ml-3 mt-2" size={16} />

    </Button>
  </Link>
</div>

            <h1 className="text-2xl text-center mb-5 font-bold">Spotlight Reads & Future Favorites</h1>
        <div className="ml-9 grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 mr-9">
          <motion.div
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-green-600 flex items-center">
              <FaBook className="mr-2" /> Book of the Month
            </h2>
            <div className="flex items-center">
              <Image
                src="https://images.unsplash.com/photo-1604866830893-c13cafa515d5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Book of the Month"
                width={150}
                height={200}
                className="rounded-md mr-4"
              />
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  The Midnight Library
                </h3>
                <p className="text-gray-600 mb-2">by Matt Haig</p>
                <p className="text-sm text-gray-500">
                  A thought-provoking novel about the choices that make up a
                  life, and the possibility of changing your destiny.
                </p>
                <Link href="/dashboard">
                <Button      className=" ml-3 mt-5 mb-4 " variant="outline">Read More</Button>
                </Link>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-green-600 flex items-center">
              <FaBook className="mr-2" /> Upcoming Releases
            </h2>
            <div className="space-y-4">
              {upcomingBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Image
                    src={book.image}
                    alt={book.title}
                    width={60}
                    height={90}
                    className="rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{book.title}</h3>
                    <p className="text-gray-600 text-sm">{book.author}</p>
                    <p className="text-gray-500 text-xs">
                      Releasing: {book.releaseDate}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default Header;
