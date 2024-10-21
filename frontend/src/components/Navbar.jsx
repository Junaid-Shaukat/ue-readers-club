'use client';
import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Book, Library, LibraryBig, Search } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";

export default function Component() {
  const [searchQuery, setSearchQuery] = useState('')
  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality here
    console.log('Searching for:', searchQuery)
  }

  return (
    <header className="flex h-16 w-full items-center border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl flex w-full items-center px-4 md:px-6">
        <nav className=" hidden lg:flex items-center space-x-6">
      <Link href="/" className="flex-shrink-0 flex items-center">
                
                <LibraryBig />
                <span className="ml-2 text-xl font-bold text-gray-900">UE Readers Club</span>
              </Link>
          
          <Link href="/dashboard/books" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            All Books
          </Link>
         
        </nav>
        <LibraryBig size={30} className="ml-4 lg:hidden "/>

        <div className="ml-auto flex items-center space-x-4">
        <div className="flex justify-center items-center">
  <div className="relative w-full">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {/* Search Icon */}
      <Search size={16}/>
    </div>
    <input
      type="text"
      placeholder="Search books..."
      className="block w-full sm:w-full mr-[60px] pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm transition duration-150 ease-in-out"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
</div>

                 
          {/* <Link
            href="#"
            className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            prefetch={false}
          >
            Get Started
          </Link> */}
          <UserButton/>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
            <Link href="/" className="flex-shrink-0 flex items-center">
                
                <LibraryBig className="lg:hidden md:hidden" href="/"/>
                <span className="ml-2 text-xl font-bold text-gray-900">UE Readers Club</span>
              </Link>
              <div className="grid gap-6 p-6">
                <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                  Home
                </Link>
                <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                  About
                </Link>
                <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                  Services
                </Link>
                <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                  Contact
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}