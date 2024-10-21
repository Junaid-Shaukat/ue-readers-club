'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

// Assume this function fetches a random quote from an API
async function fetchRandomQuote() {
    const quotes = [
      {
        text: "A room without books is like a body without a soul.",
        author: "Marcus Tullius Cicero"
      },
      {
        text: "Books are a uniquely portable magic.",
        author: "Stephen King"
      },
      {
        text: "So many books, so little time.",
        author: "Frank Zappa"
      },
      {
        text: "Good friends, good books, and a sleepy conscience: this is the ideal life.",
        author: "Mark Twain"
      },
      {
        text: "I have always imagined that Paradise will be a kind of library.",
        author: "Jorge Luis Borges"
      },
      {
        text: "The only thing that you absolutely have to know is the location of the library.",
        author: "Albert Einstein"
      },
      {
        text: "If you do not like reading, you have not found the right book.",
        author: "J.K. Rowling"
      },
      {
        text: "A book is a dream that you hold in your hand.",
        author: "Neil Gaiman"
      },
      {
        text: "Books are a mirror: if an ass looks in, you can not expect an angel to look out.",
        author: "B. W. Powe"
      },
      {
        text: "The man who does not read good books is no better than the man who can't.",
        author: "Mark Twain"
      },
      {
        text: "Reading is to the mind what exercise is to the body.",
        author: "Joseph Addison"
      },
      {
        text: "Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers.",
        author: "Charles W. Eliot"
      },
      {
        text: "There are worse crimes than burning books. One of them is not reading them.",
        author: "Joseph Brodsky"
      },
      {
        text: "Books can be dangerous. The best ones should be labeled 'This could change your life.'",
        author: "Helen Exley"
      },
      {
        text: "A great book should leave you with many experiences, and slightly exhausted at the end. You live several lives while reading.",
        author: "William Styron"
      },
      {
        text: "The best way to predict your future is to create it.",
        author: "Peter Drucker"
      },
      {
        text: "We read to know we are not alone.",
        author: "C.S. Lewis"
      },
      {
        text: "Reading gives us someplace to go when we have to stay where we are.",
        author: "Mason Cooley"
      },
      {
        text: "The world was hers for the reading.",
        author: "Betty Smith"
      },
      {
        text: "Reading is a form of therapy.",
        author: "Unknown"
      },
      {
        text: "In books, I have traveled, not only to other worlds, but into my own.",
        author: "Anna Quindlen"
      },
    ];
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
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