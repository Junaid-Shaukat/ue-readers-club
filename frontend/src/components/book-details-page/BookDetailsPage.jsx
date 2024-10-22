import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, BookOpen, MessageSquare, Send, MoreVertical, Eye, ThumbsUp, Reply, Edit, Trash2, Clock, Calendar, CornerUpLeft, Loader2, ChevronDown, X, Tag, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';

const LikesPopup = ({ isOpen, onClose, likes }) => {
  if (likes.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            exit={{ y: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg p-6 w-80 max-w-md relative"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-semibold mb-4">Liked by:</h3>
            <ul className="space-y-2">
              {likes.map((userId) => (
                <CommentLike key={userId} userId={userId} />
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CommentLike = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://ue-readers-club-backend.vercel.app/users/findbyid/${userId}`);
        setUser(response.data.user);
      } catch (err) {
        setError('Failed to fetch user data');
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <li className="flex items-center space-x-2">
        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
      </li>
    );
  }

  if (error) {
    return (
      <li className="flex items-center space-x-2 text-red-500" role="alert">
        <span className="sr-only">Error:</span>
        {error}
      </li>
    );
  }

  if (!user) {
    return (
      <li className="flex items-center space-x-2 text-gray-500" role="alert">
        <span className="sr-only">Notice:</span>
        User not found
      </li>
    );
  }

  return (
    <li className="flex items-center space-x-2">
      <Avatar className="h-6 w-6">
        <AvatarImage src={user.imageUrl} alt={user.username} />
        <AvatarFallback>{user.username ? user.username.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
      </Avatar>
      <span>{user.username}</span>
    </li>
  );
};

const Comment = ({ comment, onReply, onLike, onEdit, onDelete, currentUserId, allComments, onScrollToComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showLikes, setShowLikes] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  const handleEdit = () => {
    onEdit(comment._id, editedContent);
    setIsEditing(false);
  };

  const handleReply = () => {
    onReply(comment._id, replyContent);
    setIsReplying(false);
    setReplyContent('');
  };

  const getParentComment = (parentId) => {
    return allComments.find(c => c._id === parentId);
  };

  const truncateContent = (content, maxLength = 50) => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  const isLikedByCurrentUser = comment.user_id_in_like.includes(currentUserId);
  const hasLikes = comment.user_id_in_like.length > 0;

  return (
    <div className="mb-4">
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage src={comment.avatar} alt={comment.user} />
          <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 bg-gray-100 rounded-lg p-4">
          {comment.parent_id && (
            <div 
              className="bg-gray-200 p-2 rounded mb-2 text-sm text-gray-600 cursor-pointer"
              onClick={() => onScrollToComment(comment.parent_id)}
            >
              <CornerUpLeft className="h-4 w-4 inline mr-1" />
              {truncateContent(getParentComment(comment.parent_id)?.content || 'Commment Deleted by User')}
            </div>
          )}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center justify-between mb-2">
              {
                comment.user_id === currentUserId ? (
                  <h4 className="text-sm font-semibold text-gray-900">YOU</h4>
                ) : (
                  <h4 className="text-sm font-semibold text-gray-900">{comment.user}</h4>
                )
              }
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-xs text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(comment.waqt)}
                </DropdownMenuItem>
                {comment.user_id === currentUserId && (
                  <>
                    <DropdownMenuItem onClick={() => setIsEditing(!isEditing)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(comment._id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-col">
            {isEditing ? (
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="mb-2"
              />
            ) : (
              <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => onLike(comment._id, currentUserId)}>
                  <ThumbsUp className={`h-4 w-4 mr-1 ${isLikedByCurrentUser ? 'text-red-500' : ''}`} />
                  {comment.likes}
                </Button>
                {hasLikes && (
                  <Button variant="ghost" size="sm" onClick={() => setShowLikes(!showLikes)}>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setIsReplying(!isReplying)}>
                  <Reply className="h-4 w-4 mr-1" />
                  Reply
                </Button>
              </div>
            </div>
            <LikesPopup
              isOpen={showLikes}
              onClose={() => setShowLikes(false)}
              likes={comment.user_id_in_like}
            />
            <span className="text-xs text-gray-500 self-end mt-1">
              <Clock className="h-3 w-3 inline mr-1" />
              {formatTime(comment.waqt)}
            </span>
          </div>
          {isEditing && (
            <Button onClick={handleEdit} className="mt-2">
              Save Edit
            </Button>
          )}
          {isReplying && (
            <div className="mt-2 relative">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write your reply..."
                className="mb-2 pr-8"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-2 right-2"
                onClick={() => setIsReplying(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button onClick={handleReply}>Post Reply</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CustomToast = ({ message, isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function BookDetails({ book = { _id: '', name: '', author: '', genre: '', shortdescription: '', longdescription: '', clicks: 0, imageurls: '', tags: '' } }) {
  const { user } = useUser();
  const [bookid, setbookid] = useState(book._id);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const commentRefs = useRef({});
  const commentsContainerRef = useRef(null);
  const topCommentRef = useRef(null);

  const fetchComments = useCallback(async () => {
    if (!bookid) {
      console.error("Book ID is not available");
      return;
    }

    try {
      const response = await axios.get(`https://ue-readers-club-backend.vercel.app/comment/getcommentByBookId/${bookid}`);
      if (Array.isArray(response.data.comments)) {
        const sortedComments = response.data.comments.sort((a, b) => new Date(b.waqt) - new Date(a.waqt));
        setComments(sortedComments);
      } else {
        console.error("Fetched data is not an array:", response.data.comments);
        setComments([]);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  }, [bookid]);

  useEffect(() => {
    fetchComments();
    const intervalId = setInterval(fetchComments, 5000);
    return () => clearInterval(intervalId);
  }, [fetchComments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (newComment.trim() && user) {
      const commentData = {
        user_id: user.id,
        book_id: bookid,
        waqt: new Date().toISOString(),
        user: `${user.firstName} ${user.lastName}`,
        avatar: user.imageUrl,
        content: newComment.trim(),
        likes: 0,
      };

      try {
        const response = await axios.post("https://ue-readers-club-backend.vercel.app/comment/createcomment", commentData);
        if (response.status === 200) {
          fetchComments();
          setNewComment("");
        } else {
          console.error("Error creating comment:", response.data.message);
        }
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  const handleReply = async (parentId, content) => {
    if (content.trim() && user) {
      const replyData = {
        user_id: user.id,
        book_id: bookid,
        waqt: new  Date().toISOString(),
        user: `${user.firstName} ${user.lastName}`,
        avatar: user.imageUrl,
        content: content.trim(),
        likes: 0,
        parent_id: parentId,
      };

      try {
        const response = await axios.post("https://ue-readers-club-backend.vercel.app/comment/createcomment", replyData);
        if (response.status === 200) {
          await fetchComments();
          if (topCommentRef.current) {
            topCommentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
          console.error("Error creating reply:", response.data.message);
        }
      } catch (error) {
        console.error("Error submitting reply:", error);
      }
    }
  };

  const handleLike = async (commentId, userId) => {
    try {
      const response = await axios.post(`https://ue-readers-club-backend.vercel.app/comment/likes/${commentId}`, { userId });
      if (response.status === 200) {
        fetchComments();
      } else {
        console.error("Error liking comment:", response.data.message);
      }
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  const handleEdit = async (commentId, newContent) => {
    try {
      const response = await axios.put(`https://ue-readers-club-backend.vercel.app/comment/editCommentById/${commentId}`, { content: newContent });
      if (response.status === 200) {
        fetchComments();
      } else {
        console.error("Error editing comment:", response.data.message);
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const response = await axios.delete(`https://ue-readers-club-backend.vercel.app/comment/deletecomment/${commentId}`);
      if (response.status === 200) {
        fetchComments();
      } else {
        console.error("Error deleting comment:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleScrollToComment = (commentId) => {
    if (commentRefs.current[commentId]) {
      commentRefs.current[commentId].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Book Details</h1>
        
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="mb-8 hover:bg-gray-100 transition-colors duration-200"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Books
        </Button>
        
        <Card className="overflow-hidden shadow-lg border-none mb-8">
          <div className="md:flex">
            <div className="md:w-1/3 relative h-[400px] md:h-auto">
              <Image
                src={book.imageurls}
                alt={book.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
              />
            </div>
            <CardContent className="md:w-2/3 p-4 sm:p-8 bg-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">{book.name}</h1>
                  <h2 className="text-xl sm:text-2xl text-gray-600 mb-4">by {book.author}</h2>
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
                    <DropdownMenuItem onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem>Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="flex items-center mb-4">
                <BookOpen className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-green-700 font-semibold">{book.genre}</span>
              </div>
              
              <p className="text-gray-700 mb-6 italic line-clamp-2">{book.shortdescription}</p>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">About the Book</h3>
                <p className="text-gray-600 leading-relaxed">{book.longdescription}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-500">
                <div className="flex items-center mb-2 sm:mb-0">
                  <Eye className="h-5 w-5 mr-2" />
                  <span>{book.clicks} views</span>
                </div>
                {book.tags && (
                  <div className="flex flex-wrap items-center">
                    <Tag className="h-5 w-5 mr-2" />
                    {book.tags.split(',').map((tag, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm mr-2 mb-2">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </div>
        </Card>

        <Card className="border-none shadow-lg">
          <CardContent className="p-4 sm:p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <MessageSquare className="h-6 w-6 mr-2" />
              Discussion
            </h3>
            
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <Textarea
                placeholder="Share your thoughts on this book..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-4 w-full"
              />
              
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
                <Send className="h-4 w-4 mr-2" />
                Post Comment
              </Button>
            </form>

            <Separator className="mb-4" />
            
            <div className="space-y-6 max-h-[600px] overflow-y-auto" ref={commentsContainerRef}>
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <Loader2 className="h-8 w-8 animate-spin text-green-500" />
                </div>
              ) : (
                comments.map((comment, index) => (
                  <div key={comment._id} ref={index === 0 ? topCommentRef : (el) => commentRefs.current[comment._id] = el}>
                    <Comment
                      comment={comment}
                      onReply={handleReply}
                      onLike={handleLike}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      currentUserId={user?.id}
                      allComments={comments}
                      onScrollToComment={handleScrollToComment}
                    />
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <CustomToast 
        message="Link copied to clipboard!" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
}