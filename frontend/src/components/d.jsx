'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaBook, FaNewspaper, FaMagnifyingGlass, FaRegHeart, FaHeart } from 'react-icons/fa6'
import { GiMagnifyingGlass, GiSpellBook, GiDramaMasks, GiRocketFlight, GiHeartInside, GiBookshelf, GiBookmark } from 'react-icons/gi'
import { BsStars } from 'react-icons/bs'

const genres = [
  { name: 'Fiction', icon: GiSpellBook },
  { name: 'Non-Fiction', icon: FaNewspaper },
  { name: 'Mystery', icon: GiMagnifyingGlass },
  { name: 'Sci-Fi', icon: GiRocketFlight },
  { name: 'Romance', icon: GiHeartInside },
  { name: 'Drama', icon: GiDramaMasks },
  { name: 'Biography', icon: GiBookmark },
  { name: 'History', icon: GiBookshelf },
]

const trendingBooks = [
  { id: 1, title: 'The Midnight Library', author: 'Matt Haig', image: '/placeholder.svg?height=400&width=300' },
  { id: 2, title: 'Atomic Habits', author: 'James Clear', image: '/placeholder.svg?height=400&width=300' },
  { id: 3, title: 'The Invisible Life of Addie LaRue', author: 'V.E. Schwab', image: '/placeholder.svg?height=400&width=300' },
  { id: 4, title: 'Project Hail Mary', author: 'Andy Weir', image: '/placeholder.svg?height=400&width=300' },
  { id: 5, title: 'The Four Winds', author: 'Kristin Hannah', image: '/placeholder.svg?height=400&width=300' },
]

const upcomingBooks = [
  { id: 1, title: 'The Last Thing He Told Me', author: 'Laura Dave', releaseDate: 'May 4, 2023', image: '/placeholder.svg?height=300&width=200' },
  { id: 2, title: 'While Justice Sleeps', author: 'Stacey Abrams', releaseDate: 'May 11, 2023', image: '/placeholder.svg?height=300&width=200' },
  { id: 3, title: 'Project Hail Mary', author: 'Andy Weir', releaseDate: 'May 4, 2023', image: '/placeholder.svg?height=300&width=200' },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(bookId => bookId !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-green-600 flex items-center">
            <FaBook className="mr-2" />
            UE READERS CLUB
          </Link>
          <div className="relative">
            <input
              type="text"
              placeholder="Search books..."
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-300 w-64 focus:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaMagnifyingGlass className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
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
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Explore Genres</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
            {genres.map((genre, index) => (
              <motion.div
                key={genre.name}
                className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <genre.icon className="text-4xl mb-2 text-green-600 mx-auto" />
                <h3 className="text-sm font-medium">{genre.name}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
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
                    className="mt-2 text-green-600 hover:text-green-800 transition-colors duration-300"
                  >
                    {favorites.includes(book.id) ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
                src="/placeholder.svg?height=200&width=150"
                alt="Book of the Month"
                width={150}
                height={200}
                className="rounded-md mr-4"
              />
              <div>
                <h3 className="font-semibold text-lg mb-2">The Midnight Library</h3>
                <p className="text-gray-600 mb-2">by Matt Haig</p>
                <p className="text-sm text-gray-500">
                  A thought-provoking novel about the choices that make up a life, and the possibility of changing your destiny.
                </p>
                <motion.button
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full hover:from-green-600 hover:to-blue-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read More
                </motion.button>
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
                    <p className="text-sm text-gray-600">{book.author}</p>
                    <p className="text-xs text-gray-500">Release: {book.releaseDate}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Virtual Book Club Meeting', date: 'May 15, 2023', time: '7:00 PM' },
              { title: 'Author Q&A: Jane Doe', date: 'May 22, 2023', time: '6:30 PM' },
              { title: 'Summer Reading Challenge Kickoff', date: 'June 1, 2023', time: 'All Day' },
            ].map((event, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.date} - {event.time}</p>
                <motion.button
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  RSVP
                </motion.button>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">UE Readers Club</h3>
              <p className="text-sm">Connecting book lovers since 2023</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
              <ul className="text-sm space-y-2">
                <li><Link href="/about" className="hover:text-green-300 transition-colors duration-300">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-green-300 transition-colors duration-300">Contact</Link></li>
                <li><Link href="/faq" className="hover:text-green-300 transition-colors duration-300">FAQ</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-semibold mb-2">Stay Connected</h3>
              <p className="text-sm mb-2">Subscribe to our newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-l-full text-gray-800 focus:outline-none focus:ring-2  focus:ring-green-600"
                />
                <motion.button
                  className="bg-green-600 text-white px-4 py-2 rounded-r-full hover:bg-green-700 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}





/// firebase


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQShh-3C22kjXc8R2SBn8dO7PIbU7iT80",
  authDomain: "ue-readers-club.firebaseapp.com",
  projectId: "ue-readers-club",
  storageBucket: "ue-readers-club.appspot.com",
  messagingSenderId: "1040364008256",
  appId: "1:1040364008256:web:71a605b1d8a95cfa0dc0a5",
  measurementId: "G-JSYDX81ZBB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);