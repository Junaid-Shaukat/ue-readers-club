// src/app/admin/AdminPanel.jsx (Client Component)
"use client"; // Indicating it's a client component

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  BookOpen,
  PlusCircle,
  List,
  Settings,
  Upload,
  Library,
  LibraryBig,
  Menu,
} from "lucide-react";
import Link from "next/link";
import AddPage from "./pages/Add";
import BookPage from "./pages/BookList";
import SettingsPage from "./pages/Settings";
import ShowBook from "./pages/ShowBook";

const AdminPanel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("Add Book");

  const onSubmit = (data) => {
    console.log({ ...data, image: uploadedImage });
    // Here you would typically send the data to your API
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    setUploadedImage(files[0]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Add Book":
        return <AddPage />;
      case "Show Books":
        return (
        <ShowBook/>
        );
      case "Book List":
        return (
        <BookPage/>
        );
      case "Settings":
        return (
          <SettingsPage/>
        );
      default:
        return null;
    }
  };
  const [isOpen, setisOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
   
    <Menu onClick={() => setisOpen(!isOpen)} className={`m-2 md:m-5 lg:m-6 cursor-pointer`} />

    {/* Sidebar */}
    <div className={isOpen ? "w-64 bg-white shadow-lg" : "w-64 bg-white shadow-lg hidden"}>
      <div className="p-6">
        <Link href="/" className="flex-shrink-0 flex items-center">
          <LibraryBig />
          <span className="ml-2 text-xl font-bold text-gray-900">
            UE Readers Club
          </span>
        </Link>
      </div>
      <nav className="mt-6">
        {["Add Book", "Show Books", "Book List", "Settings"].map((item, index) => (
          <a
            key={index}
            href="#"
            onClick={() => setActiveTab(item)}
            className={`flex items-center px-6 py-3 text-gray-700 transition-colors duration-200 ease-in-out hover:bg-green-50 hover:text-green-600 ${activeTab === item ? "bg-green-50 text-green-600" : ""}`}
          >
            {index === 0 ? (
              <PlusCircle className="mr-3" size={20} />
            ) : index === 1 ? (
              <Library className="mr-3" size={20} />
            ) : index === 2 ? (
              <List className="mr-3" size={20} />
            ) : (
              <Settings className="mr-3" size={20} />
            )}
            {item}
          </a>
        ))}
      </nav>
    </div>
  
    {/* Main Content */}
    <div className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto py-10 px-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">{activeTab}</h2>
        {renderContent()}
      </div>
    </div>
  </div>
  
  );
};

export default AdminPanel;
