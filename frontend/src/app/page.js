"use client";
import { Badge } from "@/components/ui/badge";
import Bookofmonth from "@/Bookof month";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Book,
  Users,
  Calendar,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Facebook,
  Twitter,
  Instagram,
  Search,
  Menu,
  Library,
  LibraryBig,
  MapPin,
  Clock,
  BookOpen,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const controls = useAnimation();

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }));
  }, [controls]);

  const bookAnimation = {
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  const buttonAnimation = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  const buttonStyle = {
    fontSize: "0.875rem",
    padding: "0.5rem 1rem",
  };
  const events = [
    {
      title: "The Great Gatsby Discussion",
      book: "The Great Gatsby by F. Scott Fitzgerald",
      date: "May 15, 2024",
      time: "7:00 PM - 8:30 PM",
      location: "City Library, Room 101",
    },
    {
      title: "Sci-Fi Book of the Month",
      book: "Dune by Frank Herbert",
      date: "June 5, 2024",
      time: "6:30 PM - 8:00 PM",
      location: "Stargazer Cafe",
    },
    {
      title: "Mystery Lovers Meetup",
      book: "The Silent Patient by Alex Michaelides",
      date: "June 20, 2024",
      time: "7:30 PM - 9:00 PM",
      location: "Sherlock's Bookshop",
    },
    {
      title: "Classic Literature Seminar",
      book: "Pride and Prejudice by Jane Austen",
      date: "July 10, 2024",
      time: "6:00 PM - 7:30 PM",
      location: "Austen House, Main Hall",
    },
  ];
  // TODO: for newsletter subscription
  // const [email, setEmail] = useState('')
  // const [isSubmitted, setIsSubmitted] = useState(false)

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   // TODO: Implement newsletter subscription logic
  //   console.log('Subscribing email:', email)
  //   setIsSubmitted(true)
  //   setTimeout(() => setIsSubmitted(false), 3000)
  //   setEmail('')
  // }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex-shrink-0 flex items-center">
                {/* <motion.img 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="h-8 w-auto" 
                  src="/placeholder.svg?height=32&width=32" 
                  alt="UE Readers Club Logo" 
                /> */}
                <LibraryBig />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  UE Readers Club
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="#"
                className="border-green-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </a>
              <a
             href="/dashboard/books"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Books
              </a>
              <a
                href="#events-section"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Events
              </a>
              <a
                href="#challange"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Community
              </a>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <motion.div
                variants={buttonAnimation}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <Link href="/dashboard">
                  <Button variant="ghost" className="mr-2" style={buttonStyle}>
                    Login
                  </Button>
                </Link>
              </motion.div>
              {/* <motion.div variants={buttonAnimation} initial="rest" whileHover="hover" whileTap="tap">
                <Link href='/dashboard'><Button variant="outline" className="mr-2" style={buttonStyle}>Sign Up</Button></Link>
              </motion.div> */}
              <motion.div
                variants={buttonAnimation}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <Link href="/dashboard">
                  <Button
                    className="bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700"
                    style={buttonStyle}
                  >
                    Get Started
                  </Button>
                </Link>
                

              </motion.div>
              <div className="ml-4 mt-2"><UserButton/></div>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
                
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                  >
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <UserButton/>
                    <nav className="mt-6">
                  <Link href="/" className="flex-shrink-0 mb-2 flex items-center">
                
                <LibraryBig />
                <span className="ml-2 text-xl font-bold text-gray-900">UE Readers Club</span>
              </Link>
                    <a
                      href="#"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                      Home
                    </a>
                    <a
                      href="/dashboard/books"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                      Books
                    </a>
                    <a
                      href="#events-section"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                      Events
                    </a>
                    <a
                      href="#challange"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                      Community
                    </a>
                  </nav>
                  <div className="mt-6">
                    <Link href="/dashboard">
                      {" "}
                      <Button
                        variant="outline"
                        className="w-full mt-3"
                        style={buttonStyle}
                      >
                        Login
                      </Button>{" "}
                    </Link>
                    <Link href="/dashboard">
                      {" "}
                      <Button
                        variant="outline"
                        className="w-full mt-3"
                        style={buttonStyle}
                      >
                        Sign Up
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      {" "}
                      <Button
                        className="w-full mt-3 bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700"
                        style={buttonStyle}
                      >
                        Dashboard
                      </Button>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl"
                >
                  <span className="block xl:inline">Discover new worlds</span>{" "}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 xl:inline">
                    one page at a time
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                >
                  Join our vibrant community of book lovers. Explore captivating
                  stories, engage in thought-provoking discussions, and connect
                  with fellow readers from around the globe.
                </motion.p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <motion.div
                    variants={buttonAnimation}
                    initial="rest"
                    whileHover="hover"
                    whileTap="rest"
                  >
                    <a
                      href="/dashboard"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 md:py-3 md:text-lg md:px-8"
                    >
                      Join Now
                    </a>
                  </motion.div>
                  <motion.div
                    variants={buttonAnimation}
                    initial="rest"
                    whileHover="hover"
                    whileTap="rest"
                    className="mt-3 sm:mt-0 sm:ml-3"
                  >
                    <a
                      href="/dashboard"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 md:py-3 md:text-lg md:px-8"
                    >
                      Learn More
                    </a>
                  </motion.div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Books on a shelf"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <Badge
              variant="outline"
              className="text-green-600 border-green-600 text-[14px]"
            >
              Features
            </Badge>
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Join UE Readers Club?
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  name: "Diverse Book Selection",
                  description: "Access to a wide range of genres and authors.",
                  icon: Book,
                },
                {
                  name: "Community Discussions",
                  description:
                    "Engage in lively debates and share your thoughts.",
                  icon: Users,
                },
                {
                  name: "Regular Meetups",
                  description:
                    "Join both online and offline book club meetings.",
                  icon: Calendar,
                },
                {
                  name: "Author Q&A Sessions",
                  description:
                    "Interact with your favorite authors in exclusive sessions.",
                  icon: MessageCircle,
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={controls}
                  custom={index}
                  className="relative"
                >
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-green-400 to-green-600 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      {feature.name}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    {feature.description}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Book of the Month Section */}
     <Bookofmonth></Bookofmonth>

      {/* Upcoming Events Section */}
      <section
        className="py-16 bg-gradient-to-b from-gray-50 to-white"
        id="events-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <Badge
              variant="outline"
              className="text-green-600 border-green-600 text-[14px]"
            >
              Events
            </Badge>
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
              Upcoming Book Club Events
            </p>
          </div>
          <div className="w-full p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((event, index) => (
                <Card
                  key={index}
                  className="border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white"
                >
                  <CardHeader>
                    <CardTitle className="text-black">{event.title}</CardTitle>
                    <CardDescription className="flex items-center text-gray-600">
                      <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                      {event.book}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-5 h-5 mr-2 text-green-600" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-5 h-5 mr-2 text-green-600" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 mr-2 text-green-600" />
                        {event.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          {/* <div className="mt-10 space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {[
              { title: "Virtual Book Discussion", date: "June 15, 2024", time: "7:00 PM EST" },
              { title: "Author Meet & Greet", date: "June 22, 2024", time: "3:00 PM EST" },
              { title: "Summer Reading Kickoff", date: "July 1, 2024", time: "6:00 PM EST" },
              { title: "Book Swap Social", date: "July 10, 2024", time: "5:00 PM EST" },
            ].map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                custom={index}
                className="relative p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                <p className="mt-2 text-base text-gray-500">{event.date} at {event.time}</p>
                <motion.div variants={buttonAnimation} initial="rest" whileHover="hover" whileTap="tap" className="mt-4">
                  <a href="#" className="text-base font-medium text-green-600 hover:text-green-500">
                    Learn more <span aria-hidden="true">&rarr;</span>
                  </a>
                </motion.div>
              </motion.div>
            ))}
          </div> */}
        </div>
      </section>

      {/* Reading Challenge Section */}
      <section className="py-16 bg-white" id="challange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <Badge
              variant="outline"
              className="text-green-600 border-green-600 text-[14px]"
            >
              Challenge
            </Badge>
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
              Join Our Annual Reading Challenge
            </p>
          </div>
          <div className="mt-10 lg:mt-0 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <p className="text-lg text-gray-500">
                Push your reading boundaries and discover new favorites with our
                annual reading challenge. Set your goal, track your progress,
                and compete with fellow book lovers!
              </p>
              <ul className="ml-11 mt-10 space-y-4">
                {[
                  "Set your personal reading goal",
                  "Explore curated reading lists",
                  "Track your progress",
                  "Earn badges and rewards",
                  "Connect with other participants",
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -50 }}
                    animate={controls}
                    custom={index}
                    className="flex items-center"
                  >
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-500">{item}</p>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-10">
                <motion.div
                  variants={buttonAnimation}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <a
                    href="/dashboard"
                    className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700"
                    style={buttonStyle}
                  >
                    Start the Challenge
                  </a>
                </motion.div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 relative">
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full rounded-lg shadow-lg"
                src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Reading Challenge"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            What Our Members Say
          </h2>
          <div className="mt-6 grid gap-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {[
              {
                name: "Sarah Johnson",
                quote:
                  "UE Readers Club has reignited my passion for reading. The discussions are always insightful!",
                image: "https://avatar.iran.liara.run/public/40",
              },
              {
                name: "Michael Chen",
                quote:
                  "I've discovered so many great books through this club. It's been an amazing journey!",
                image: "https://avatar.iran.liara.run/public",
              },
              {
                name: "Emily Rodriguez",
                quote:
                  "The author Q&A sessions are my favorite. It's incredible to interact with writers I admire.",
                image: "https://avatar.iran.liara.run/public/boy",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                custom={index}
                className="flex flex-col items-center"
              >
                <img
                  className="w-20 h-20 rounded-full mb-4 border-4 border-green-400"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <p className="text-lg leading-6 font-medium text-gray-900">
                  {testimonial.name}
                </p>
                <div className="mt-2 text-base text-gray-500 text-center italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}

      <section className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="block">Want book recommendations?</span>
              <span className="block text-green-900">
                Sign up for our newsletter.
              </span>
            </h2>
            <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="lg:w-[600px] sm:w-full px-5 py-3 text-black placeholder-gray-500 focus:ring-white focus:border-white sm:max-w-xs border-gray-300 rounded-md"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <motion.div
                    variants={buttonAnimation}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      type="submit"
                      className="bg-gradient-to-r flex justify-center items-center gap-1  from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700"
                      style={buttonStyle}
                    >
                      Subscribe
                      <ArrowRight
                        className="mt-[5px]"
                        strokeWidth={3}
                        size={18}
                      />
                    </Button>
                  </motion.div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-4">
            {[
              {
                question: "How often do you meet?",
                answer:
                  "We have online discussions weekly and in-person meetups monthly.",
              },
              {
                question: "Can I suggest books for the club?",
                answer:
                  "We encourage members to suggest books for future readings.",
              },
              {
                question: "Is there a free trial available?",
                answer: "Yes, we offer a 7-day free trial for new members.",
              },
              {
                question: "How do I cancel my membership?",
                answer:
                  "You can cancel your membership anytime from your account settings.",
              },
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                custom={index}
                className="bg-gray-50 shadow-sm overflow-hidden rounded-md hover:shadow-md transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-4 py-5 sm:px-6 text-left focus:outline-none"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {faq.question}
                    </h3>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-green-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-5 sm:px-6"
                  >
                    <p className="text-base text-gray-500">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </motion.a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2024 UE Readers Club. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
