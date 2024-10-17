'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

// Assume this function fetches a random quote from an API
async function fetchRandomQuote() {
  // Replace this with your actual API call
  return {
    text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss"
  };
}

export default function QuoteSection() {
  const [quote, setQuote] = useState({ text: '', author: '' });

  const getNewQuote = async () => {
    const newQuote = await fetchRandomQuote();
    setQuote(newQuote);
  };

  useEffect(() => {
    getNewQuote();
  }, []);

  return (
    <section className="ml-11 mr-11 mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center text-black">Quote of the Moment</h2>
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-8 sm:p-12 text-white relative">
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-y-6"></div>
            <blockquote className="text-2xl sm:text-3xl font-medium mb-6 italic relative z-10">
              "{quote.text}"
            </blockquote>
            <cite className="block text-xl sm:text-2xl font-semibold relative z-10">- {quote.author}</cite>
            <div className="absolute bottom-4 right-4">
              <Button 
                variant="outline" 
                size="icon"
                className="bg-white text-green-600 hover:bg-green-100 transition-colors duration-200"
                onClick={getNewQuote}
              >
                <RefreshCw className="h-5 w-5" />
                <span className="sr-only">New Quote</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
