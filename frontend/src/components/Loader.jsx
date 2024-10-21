
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Book } from 'lucide-react';

const BookClubLoader = () => {
  const [currentBook, setCurrentBook] = useState(0);
  const bookColors = ['#4CAF50', '#2196F3', '#FFC107', '#E91E63', '#9C27B0'];
  const bookTitles = ['Adventure', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBook((prevBook) => (prevBook + 1) % bookColors.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <motion.div
          key={currentBook}
          initial={{ rotateY: -90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: 90, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <Book
            size={64}
            color={bookColors[currentBook]}
            strokeWidth={1.5}
            className="mx-auto"
          />
        </motion.div>
        <motion.h2
          key={`title-${currentBook}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-gray-800"
        >
          {bookTitles[currentBook]}
        </motion.h2>
        <p className="mt-2 text-gray-600">Loading your literary adventure...</p>
        <div className="mt-4 flex justify-center space-x-2">
          {bookColors.map((color, index) => (
            <motion.div
              key={color}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
              animate={{
                scale: currentBook === index ? 1.5 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookClubLoader;