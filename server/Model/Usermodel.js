import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Make sure to set userId as unique
    username: { type: String, required: true },
    imageUrl: { type: String, required: true },
}, { timestamps: true }); // Optional: Add timestamps

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
