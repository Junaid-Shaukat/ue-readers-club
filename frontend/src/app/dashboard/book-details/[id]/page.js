"use client"; // This makes it a Client Component

import BookDetailsPage from '@/components/book-details-page/BookDetailsPage';
import { useParams } from 'next/navigation';

const BookDetails = () => {
  const params = useParams();
  const { id } = params; // Access the dynamic id from the URL

  return (
    <div>
      <h1>Book Details for ID: {id}</h1>
      {/* Fetch and display book details using the id */}
    <BookDetailsPage/>

    </div>
  );
};

export default BookDetails;
