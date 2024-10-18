import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, BookOpen, User, Tag, Eye, MessageSquare, Send, MoreVertical, ThumbsUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock book data (in a real app, this would be fetched from an API)
const book = {
  name: "The Great Gatsby",
  genre: "Classic Literature",
  shortDescription: "A tale of wealth, love, and the American Dream in the Roaring Twenties.",
  longDescription: "Set in the summer of 1922, The Great Gatsby follows the lives of a group of characters living in the fictional town of West Egg on Long Island. The story primarily concerns the young and mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan. Considered to be Fitzgerald's magnum opus, The Great Gatsby explores themes of decadence, idealism, resistance to change, social upheaval, and excess, creating a portrait of the Jazz Age that has been described as a cautionary tale regarding the American Dream.",
  author: "F. Scott Fitzgerald",
  imageUrl: "https://images.unsplash.com/photo-1609345635784-fd4a890e2326?q=80&w=1909&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  tags: ["classic", "american literature", "jazz age"],
  clicks: 1500
};

// Mock comments data (in a real app, this would be fetched from an API)
const initialComments = [
  {
    id: 1,
    user: "Alice",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "This book is a masterpiece! The way Fitzgerald captures the essence of the Roaring Twenties is simply breathtaking.",
    timestamp: "2 days ago",
    likes: 5,
    replies: [
      {
        id: 3,
        user: "Charlie",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "I couldn't agree more! The symbolism throughout the novel is incredible.",
        timestamp: "1 day ago",
        likes: 2
      }
    ]
  },
  {
    id: 2,
    user: "Bob",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "I found the symbolism in this novel to be particularly striking. The green light is such a powerful metaphor.",
    timestamp: "1 day ago",
    likes: 3,
    replies: []
  }
];

const Comment = ({ comment, onReply, onLike }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleReply = () => {
    onReply(comment.id, replyContent);
    setReplyContent("");
    setIsReplying(false);
  };

  return (
    <div className="mb-4">
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage src={comment.avatar} alt={comment.user} />
          <AvatarFallback>{comment.user[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 bg-gray-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-900">{comment.user}</h4>
            <span className="text-xs text-gray-500">{comment.timestamp}</span>
          </div>
          <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <button onClick={() => onLike(comment.id)} className="flex items-center space-x-1 hover:text-blue-600">
              <ThumbsUp className="h-4 w-4" />
              <span>{comment.likes}</span>
            </button>
            <button onClick={() => setIsReplying(!isReplying)} className="hover:text-blue-600">
              Reply
            </button>
          </div>
        </div>
      </div>
      {isReplying && (
        <div className="ml-12 mt-2">
          <Textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            className="mb-2"
          />
          <Button onClick={handleReply} size="sm">Post Reply</Button>
        </div>
      )}
      {comment.replies && comment.replies.map((reply) => (
        <div key={reply.id} className="ml-12 mt-4">
          <Comment comment={reply} onReply={onReply} onLike={onLike} />
        </div>
      ))}
    </div>
  );
};

export default function BookDetails() {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        user: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        content: newComment.trim(),
        timestamp: "Just now",
        likes: 0,
        replies: []
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleReply = (parentId, content) => {
    const reply = {
      id: Date.now(),
      user: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      content: content,
      timestamp: "Just now",
      likes: 0
    };
    setComments(comments.map(comment => 
      comment.id === parentId 
        ? { ...comment, replies: [...(comment.replies || []), reply] }
        : comment
    ));
  };

  const handleLike = (id) => {
    setComments(comments.map(comment => 
      comment.id === id 
        ? { ...comment, likes: comment.likes + 1 }
        : {
            ...comment,
            replies: comment.replies?.map(reply =>
              reply.id === id ? { ...reply, likes: reply.likes + 1 } : reply
            )
          }
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Button
        variant="ghost"
        onClick={() => window.history.back()}
        className="mb-8 hover:bg-green-100 transition-colors duration-200"
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Books
      </Button>
      
      <div className="max-w-6xl mx-auto">
        <Card className="overflow-hidden shadow-xl border-none mb-8">
          <div className="md:flex">
            <div className="md:w-1/3 relative h-[400px] md:h-auto">
              <Image
                src={book.imageUrl}
                alt={book.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
              />
            </div>
            <CardContent className="md:w-2/3 p-8 bg-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2 text-gray-900">{book.name}</h1>
                  <h2 className="text-2xl text-gray-600 mb-4">by {book.author}</h2>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Add to favorites</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem>Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="flex items-center mb-4">
                <BookOpen className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-green-700 font-semibold">{book.genre}</span>
              </div>
              
              <p className="text-gray-700 mb-6 italic">{book.shortDescription}</p>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">About the Book</h3>
                <p className="text-gray-600 leading-relaxed">{book.longDescription}</p>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {book.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    <Tag className="h-3 w-3 mr-2" />
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center text-gray-500">
                <Eye className="h-5 w-5 mr-2" />
                <span>{book.clicks} views</span>
              </div>
            </CardContent>
          </div>
        </Card>

        <Card className="border-none shadow-xl">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <MessageSquare className="h-6 w-6 mr-2" />
              Discussion
            </h3>
            
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <Textarea
                placeholder="Share your thoughts on this book..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-4"
              />
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4 mr-2" />
                Post Comment
              </Button>
            </form>

            <div className="space-y-6">
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} onReply={handleReply} onLike={handleLike} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}