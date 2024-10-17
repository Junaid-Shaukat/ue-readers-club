'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload } from 'lucide-react'; // Assuming you are using lucide-react for the Upload icon

const AddPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // Add form submission logic here
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

  return (
    <div>
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
                  <Upload className=" animate-bounce w-12 h-12 text-green-500 mb-2" />
                  <p className="text-gray-600">Drag and drop your image here, or click to select a file</p>
                </div>
              )}
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 text-white rounded-md bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddPage;
