
import UserModel from "../Model/Usermodel.js";

export const create = async (req, res) => {
    const { userId, username, imageUrl } = req.body;

  
        // Check if the user already exists by userId or username
        const existingUser = await UserModel.findOne({ userId });

        if (!existingUser) {
            const newUser = await UserModel.create({ userId, username, imageUrl });
        }

   
     
};



export const getUser = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user by userId
        const user = await UserModel.findOne({ userId });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If user is found, return the user data
        return res.status(200).json({ message: 'User fetched successfully', user });
    } catch (error) {
        console.error('Error during user fetch:', error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

