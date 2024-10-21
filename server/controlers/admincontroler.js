import Bookmodel from "../Model/BookModel.js";

export const createbook = async (req, res) => {
  try {

    
    // Create a new book instance
    const newBook = new Bookmodel(req.body);
    
    // Save the book to the database
    const savedBook = await newBook.save(); // Use .save() instead of .create()
    
    // Send success response
    res.status(200).json({ message: "Success", book: savedBook });
  } catch (error) {
    console.error("Error details:", error); // Log the entire error object for debugging
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Error saving book", error: error.message });
  }
};



export const editBook = async (req, res) => {
  try {
    const { id } = req.params; // Get the book ID from the URL
    const updatedData = req.body; // Get the updated data from the request body

    // Find the book by ID and update it
    const updatedBook = await Bookmodel.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the data is valid according to the schema
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
};




export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params; // Get the book ID from the URL

    // Find the book by ID and delete it
    const deletedBook = await Bookmodel.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};



export const getAllBooks = async (req, res) => {
  try {
    // Fetch all comments from the database
    const Books = await Bookmodel.find();
    
    // Send a success response with the list of all comments
    res.status(200).json({
      message: "Books retrieved successfully",
      books: Books
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
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params; // Get the book ID from the URL

    // Find the book by ID
    const book = await Bookmodel.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Send a success response with the found book
    res.status(200).json({
      message: "Book retrieved successfully",
      book: book,
    });
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({
      message: "Error fetching book",
      error: error.message,
    });
  }
};




export const clicks = async (req, res) => {
    const id = req.params.id;  
    const userId = req.body.userId;   
  
  
    try {
        // Example logic for click a book
        const book = await Bookmodel.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'boook not found' });
        }

        // Your logic to handle click
        if (!book.user_id_in_view.includes(userId)) {
            book.user_id_in_view.push(userId);  // user_id_in_view
            book.clicks += 1;  // Increment clicks
        } 

        await book.save();  // Save updated comment
        return res.status(200).json(book);  // Send back the updated comment
    } catch (error) {
        console.error('Error updating clicks status:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


