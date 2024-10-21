import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const CommentLike = ({ userId }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`https://ue-readers-club-backend.vercel.app/users/findbyid/${userId}`)
        setUser(response.data.user) // Access the user object from the response
      } catch (err) {
        setError('Failed to fetch user data')
        console.error('Error fetching user:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  if (loading) {
    return (
      <li className="flex items-center space-x-2">
        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
      </li>
    )
  }

  if (error) {
    return (
      <li className="flex items-center space-x-2 text-red-500" role="alert">
        <span className="sr-only">Error:</span>
        {error}
      </li>
    )
  }

  if (!user) {
    return (
      <li className="flex items-center space-x-2 text-gray-500" role="alert">
        <span className="sr-only">Notice:</span>
        User not found
      </li>
    )
  }

  return (
    <li className="flex items-center space-x-2">
      <Avatar className="h-6 w-6">
        <AvatarImage src={user.imageUrl} alt={user.username} />
        <AvatarFallback>{user.username ? user.username.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
      </Avatar>
      <span>{user.username}</span>
    </li>
  )
}

export default CommentLike