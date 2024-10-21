'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload } from 'lucide-react'; // Assuming you are using lucide-react for the Upload icon
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from './firebase';  // Fixed path for storage import
import axios from 'axios';  // Added axios import

const AddPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [uploadedImage, setUploadedImage] = useState(null); // State to store the image file
  const [imageUrl, setImageUrl] = useState(null); // State to store the image URL
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false); // State for showing loading spinner
  const [notification, setNotification] = useState({ visible: false, message: '', success: false }); // Notification state

  // Function to upload image to Firebase and get URL
  const uploadImageToFirebase = async (file) => {
    if (!file) return null;

    const imageRef = ref(storage, `books/${file.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const onSubmit = async (data) => {
    setLoading(true); // Start loading

    // Upload the image to Firebase first
    let uploadedImageUrl = null;
    if (uploadedImage) {
      uploadedImageUrl = await uploadImageToFirebase(uploadedImage);
      setImageUrl(uploadedImageUrl); // Store the image URL
    }

    // If the image upload fails
    if (!uploadedImageUrl) {
      console.error("Image upload failed");
      setLoading(false);
      setNotification({ visible: true, message: 'Image upload failed.', success: false });
      return;
    }

    // Create book data with the uploaded image URL
    const bookData = {
      ...data,
      imageurls: uploadedImageUrl, // Add the image URL to the form data
    };

    // Send a POST request to the backend with book data
    try {
      const response = await axios.post('http://https://ue-readers-club-backend.vercel.app/admin/createbook', bookData);
      console.log('Book added successfully:', response.data);
      reset(); // Clear the form fields
      setUploadedImage(null); // Clear uploaded image
      setNotification({ visible: true, message: 'Book created successfully!', success: true }); // Show success notification
    } catch (error) {
      console.error("Error adding book:", error);
      setNotification({ visible: true, message: 'Failed to create book due to an error.', success: false }); // Show error notification
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(event.type === 'dragenter' || event.type === 'dragover');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const closeNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  return (
    <div>
      {notification.visible && (
        <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 p-4 mt-4 rounded-md shadow-md ${notification.success ? 'bg-green-200' : 'bg-red-200'}`}>
          <div className="flex justify-between items-center gap-3">
            <p className="text-sm text-gray-800">{notification.message}</p>
            <button onClick={closeNotification} className="text-gray-600 hover:text-gray-800 focus:outline-none">
              &times; {/* Close button */}
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['name', 'author', 'genre', 'tags'].map((field) => (
            <div key={field}>
              <label className="block mb-2 font-medium text-gray-700 capitalize">{field}</label>
              <input
                {...register(field, { required: `${field} is required` })}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={`Enter ${field}`}
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field].message}</p>}
            </div>
          ))}
        </div>

        {['shortdescription', 'longdescription'].map((field) => (
          <div key={field}>
            <label className="block mb-2 font-medium text-gray-700 capitalize">{field.replace('description', ' Description')}</label>
            <textarea
              {...register(field, { required: `${field} is required` })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder={`Enter ${field.replace('description', ' description')}`}
              rows={field === 'shortdescription' ? 3 : 5}
            />
            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field].message}</p>}
          </div>
        ))}

        <div>
          <label className="block mb-2 font-medium text-gray-700">Book Cover Image</label>
          <div 
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 ease-in-out ${dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-500 hover:bg-green-50'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleChange}
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              {uploadedImage ? (
                <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded cover" className="mx-auto max-h-48 rounded-md" />
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="animate-bounce w-12 h-12 text-green-500 mb-2" />
                  <p className="text-gray-600">Drag and drop your image here, or click to select a file</p>
                </div>
              )}
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 text-white rounded-md bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          disabled={loading} // Disable the button while loading
        >
          {loading ? "Uploading..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddPage;
