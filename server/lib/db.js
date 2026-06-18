import mongoose from "mongoose";

// Function to connect to MongoDB database
export const connectDB = async () => {
    try {
        //event listener
        mongoose.connection.on("connected", () => {
            console.log("Database Connected");
        });

        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`);

    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};