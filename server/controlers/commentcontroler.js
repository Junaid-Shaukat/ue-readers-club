import commentModel from "../Model/CommentsModel.js";

export const createcomment = async (req, res) => {
  try {
    // Log the request body to debug
   
    // Create a new comment instance using the request body data
    const newComment = await commentModel.create(req.body);

    // Send success response with the saved comment data
    res.status(200).json({
      message: "Comment created successfully",
      comment: newComment
    });
  } catch (error) {
    // Handle any errors during the process
    console.error("Error creating comment:", error);
      res.status(500).json({
      message: "Error creating comment",
      error: error.message
    });
  }
};






export const deletecomment = async (req, res) => {
  try {
    // Get the comment ID from the request parameters
    const commentId = req.params.id;
    
    // Find the comment by ID and delete it
    const deletedComment = await commentModel.findByIdAndDelete(commentId);
    
    // If no comment is found with the given ID
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    
    // Send a success response with the deleted comment data
    res.status(200).json({
      message: "Comment deleted successfully",
      comment: deletedComment
    });
  } catch (error) {
    // Handle any errors during the process
    console.error("Error deleting comment:", error);
    res.status(500).json({
      message: "Error deleting comment",
      error: error.message
    });
  }
};




export const getAllComments = async (req, res) => {
  try {
    // Fetch all comments from the database
    const comments = await commentModel.find();
    
    // Send a success response with the list of all comments
    res.status(200).json({
      message: "Comments retrieved successfully",
      comments: comments
    });
  } catch (error) {
    // Handle any errors during the process
    console.error("Error fetching comments:", error);
    res.status(500).json({
      message: "Error fetching comments",
      error: error.message
    });
  }
};




export const getcommentById = async (req, res) => {
    try {
      const { id } = req.params; // Get the comment ID from the URL
  
      // Find the comment by ID
      const comment = await commentModel.findById(id);
  
      if (!comment) {
        return res.status(404).json({ message: "comment not found" });
      }
  
      // Send a success response with the found comment
      res.status(200).json({
        message: "comment retrieved successfully",
        comment: comment
      });
    } catch (error) {
      // Handle any errors during the process
      console.error("Error fetching comment:", error);
      res.status(500).json({
        message: "Error fetching comment",
        error: error.message
      });
    }
  };
  

  export const getcommentByBookId = async (req, res) => {
    try {
      const { id } = req.params; // Get the book ID from the URL
  
      // Find all comments that match the provided book_id
    
      const comments = await commentModel.find({ book_id:id });
  
      if (!comments || comments.length === 0) {
        return res.status(404).json({ message: "No comments found for this book" });
      }
  
      // Send a success response with the found comments
      res.status(200).json({
        message: "Comments retrieved successfully",
        comments: comments
      });
    } catch (error) {
      // Handle any errors during the process
      console.error("Error fetching comments:", error);
      res.status(500).json({
        message: "Error fetching comments",
        error: error.message
      });
    }
  };
  export const editCommentById = async (req, res) => {
    try {
      const { id } = req.params; // Get the comment ID from the URL
      const { content } = req.body; // Get the new comment text from the request body

      // Find the comment by its ID and update the text
      const updatedComment = await commentModel.findByIdAndUpdate(
        id,

        { content }, // Update only the 'text' field
        { new: true } // Return the updated document
      );
  
      if (!updatedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      // Send a success response with the updated comment
      res.status(200).json({
        message: "Comment updated successfully",
        comment: updatedComment
      });
    } catch (error) {
      // Handle any errors during the process
      console.error("Error updating comment:", error);
      res.status(500).json({
        message: "Error updating comment",
        error: error.message
      });
    }
  };
 // Add this line to import mongoose
//import commentModel from '../models/commentModel';  // Adjust the path according to your project structure

// Your other code here...

export const likes = async (req, res) => {
    const commentId = req.params.commentId;  // Adjust according to your request structure
    const userId = req.body.userId;           // Adjust according to your request structure

    // Validate the commentId
    // if (!mongoose.Types.ObjectId.isValid(commentId)) {
    //     return res.status(400).json({ error: 'Invalid comment ID' });
    // }

    // Continue with your logic to update likes...
    try {
        // Example logic for liking a comment
        const comment = await commentModel.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Your logic to handle likes
        if (!comment.user_id_in_like.includes(userId)) {
            comment.user_id_in_like.push(userId);  // Add userId to liked users
            comment.likes += 1;  // Increment likes
        } else {
            // If user already liked, remove their like
            comment.user_id_in_like = comment.user_id_in_like.filter(id => id !== userId);
            comment.likes -= 1;  // Decrement likes
        }

        await comment.save();  // Save updated comment
        return res.status(200).json(comment);  // Send back the updated comment
    } catch (error) {
        console.error('Error updating like status:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
