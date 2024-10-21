'use client';
import Footer from "@/components/Footer";
import Allbooks from "./Allbooks";
import Genres from "./geners";
import Navbar from "./Navbar"
const page = () => {
  return (
    <>
    <Navbar/>

   <Allbooks/>
   <Footer/>
  </>
  )
}
export default page