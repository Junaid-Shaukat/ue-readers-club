'use client'

import React, { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { motion } from 'framer-motion'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'

export default function Bookofmonth() {
  const [bookOfTheMonth, setBookOfTheMonth] = useState(null)
  const placeholderImage = '/placeholder-image.jpg' // Placeholder image if book image is not available

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://ue-readers-club-backend.vercel.app/admin/getAllBooks', {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        })

        if (Array.isArray(response.data.books)) {
          const books = response.data.books
          const bookWithMostClicks = books.reduce(
            (max, book) => (book.clicks > max.clicks ? book : max),
            books[0]
          )
          setBookOfTheMonth(bookWithMostClicks)
        } else {
          console.error("Fetched data is not an array:", response.data.books)
        }
      } catch (error) {
        console.error("Error fetching books:", error)
      }
    }

    fetchBooks()
  }, [])

  if (!bookOfTheMonth) {
    return <p>Loading Book of the Month...</p>
  }

  return (
    <section className="py-16 bg-white" id="books">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <Badge variant="outline" className="text-green-600 border-green-600 text-[14px]">
            Featured Read
          </Badge>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            Book of the Month
          </p>
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              initial="rest"
              whileHover="hover"
              variants={{
                rest: { scale: 1, rotate: 0 },
                hover: { scale: 1.05,  transition: { duration: 0.1, ease: "easeInOut" } }
              }}
              className="relative w-3/4 rounded-lg shadow-lg overflow-hidden"
              style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
            >
              <Image
                className="w-full h-[900px] rounded-lg object-cover"
                src={bookOfTheMonth.imageurls || placeholderImage}
                alt="Book of the Month"
                width={500}
                height={700}
              />
            </motion.div>
          </div>
          <div className="mt-10 lg:mt-0 lg:ml-10">
            <h3 className="text-2xl font-bold text-gray-900">
              {bookOfTheMonth.name}
            </h3>
            <p className="mt-3 text-lg text-gray-500">{bookOfTheMonth.author}</p>
            <p className="mt-5 text-base text-gray-500">
              {bookOfTheMonth.longdescription}
            </p>
            <div className="mt-10">
              <motion.div
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.1 },
                  tap: { scale: 0.95 }
                }}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <Link href={`/dashboard/book-details/${bookOfTheMonth._id}`} passHref>
                  <button className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700">
                    Read More
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
