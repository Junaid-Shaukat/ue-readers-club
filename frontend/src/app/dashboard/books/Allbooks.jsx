"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaRegHeart, FaHeart, FaNewspaper } from "react-icons/fa6";
import { GiBookmark, GiBookshelf, GiDramaMasks, GiHeartInside, GiMagnifyingGlass, GiRocketFlight, GiSpellBook } from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Eye, Search } from "lucide-react";

const genres = [
  { name: "All", icon: <BsStars /> },
  { name: "Fiction", icon: <GiSpellBook /> },
  { name: "Non-Fiction", icon: <FaNewspaper /> },
  { name: "Mystery", icon: <GiMagnifyingGlass /> },
  { name: "Sci-Fi", icon: <GiRocketFlight /> },
  { name: "Romance", icon: <GiHeartInside /> },
  { name: "Drama", icon: <GiDramaMasks /> },
  { name: "Biography", icon: <GiBookmark /> },
];

const placeholderImage = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2730&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Allbooks = () => {
  const [allbooks, setAllBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((bookId) => bookId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://ue-readers-club-backend.vercel.app/admin/getAllBooks", {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });

        if (Array.isArray(response.data.books)) {
          setAllBooks(response.data.books);
          setFilteredBooks(response.data.books);
        } else {
          console.error("Fetched data is not an array:", response.data.books);
          setAllBooks([]);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setAllBooks([]);
      }
    };

    fetchBooks();
  }, []);

  const filterBooksByGenre = (genre) => {
    setSelectedGenre(genre);
    if (genre === "All") {
      setFilteredBooks(allbooks);
    } else {
      const filtered = allbooks.filter((book) =>
        book.genre.toLowerCase() === genre.toLowerCase()
      );
      setFilteredBooks(filtered);
    }
  };

  // Function to handle search input and filter books based on the search query
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);

    const filtered = allbooks.filter((book) =>
      book.name.toLowerCase().includes(value) || 
      book.author.toLowerCase().includes(value)
    );
    
    setFilteredBooks(filtered);
  };

  return (
    <section className="mb-12 mx-8">
      {/* Search bar */}
      <div className="mb-6 mt-6 flex justify-center items-center">
  <div className="relative w-full max-w-full mx-9"> {/* Use relative and max-w-md to control width */}
    <input
      type="text"
      placeholder="Search by book name or author"
      value={searchQuery}
      onChange={handleSearch} // Attach the handleSearch function here
      className="w-full p-2 border rounded-md shadow-sm pl-10" // Add padding-left for the icon
    />
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Search size={16} />
    </div>
  </div>
</div>


      <section className="mb-12">
        <h1 className="text-2xl text-center p-3 font-bold mb-4 text-gray-800">
          All Genres
        </h1>
        <div className="grid grid-cols-2 mx-9 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {genres.map((genre, index) => (
            <motion.div
              key={genre.name}
              className={`bg-white p-4 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ${
                selectedGenre === genre.name ? 'ring-2 ring-green-500' : ''
              }`}
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, delay: index * 0.1 }}
              onClick={() => filterBooksByGenre(genre.name)}
            >
              <div className="text-4xl mb-2 text-green-600 mx-auto">
                {genre.icon}
              </div>
              <h3 className="text-sm font-medium">{genre.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      <h2 className="text-2xl font-bold mb-6 text-center justify-center text-gray-800 flex items-center">
        Explore {selectedGenre === "All" ? "All Books" : `${selectedGenre} Books`}
      </h2>
      <div className="grid mx-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.isArray(filteredBooks) && filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <motion.div
              key={book._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Image
                src={book.imageurls || placeholderImage}
                alt={book.name}
                width={300}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-lg mb-1">{book.name}</h3>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-600 text-sm">{book.author}</p>
                  <p className="text-gray-500 flex items-center text-xs">
                    <Eye className="mr-1" size={18} />
                    Views: {book.clicks}
                  </p>
                </div>
                <p className="text-black text-sm mb-4 line-clamp-2">{book.shortdescription}</p>
                <div className="mt-auto flex justify-between items-center">
                  <Link href={`/dashboard/book-details/${book._id}`}>
                    <Button variant="outline">
                      Read More
                    </Button>
                  </Link>
                  <button
                    onClick={() => toggleFavorite(book._id)}
                    className="text-green-600 hover:text-green-800 transition-colors duration-300"
                  >
                    {favorites.includes(book._id) ? (
                      <FaHeart className="text-red-600" />
                    ) : (
                      <FaRegHeart className="text-red-600" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No books available for this genre</p>
        )}
      </div>
    </section>
  );
};

export default Allbooks;
