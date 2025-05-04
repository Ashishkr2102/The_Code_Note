require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { userModel, adminModel } = require("./db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routers
const { userRouter } = require("./routes/user");
const { blogRouter } = require("./routes/blog");
const { commentsRouter } = require("./routes/comments");
const { adminRouter } = require("./routes/admin");
const { likedislikeRouter } = require("./routes/likedislike");

// Register routes in order
userRouter(app);
adminRouter(app);
blogRouter(app);
commentsRouter(app);
likedislikeRouter(app);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});

async function main() {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined in .env file");
        }
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB successfully");
        app.listen(4000, () => {
            console.log("Server running on port 4000");
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

main();
