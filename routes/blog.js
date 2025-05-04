const { blogModel } = require("../db"); // Corrected import

function blogRouter(app) {
  // Create blog post
  app.post("/blog/posts", async function (req, res) {
    const { author, tile, content, coverImage, status } = req.body;

    try {
      const newBlog = await blogModel.create({
        author,
        tile,
        content,
        coverImage,
        status,
        updatedAt: new Date(),
      });

      res.status(201).json({
        message: "Blog post created successfully",
        blog: newBlog,
      });
    } catch (e) {
      res.status(500).json({
        message: "Error creating blog post",
        error: e.message,
      });
    }
  });

  // Get all blog posts by specific author
  app.get("/blog/posts", async function (req, res) {
    const authorId = req.query.author;

    if (!authorId) {
      return res.status(400).json({ message: "Author ID is required" });
    }

    try {
      const posts = await blogModel.find({ author: authorId });
      res.json({
        message: "Fetched blog posts by user",
        posts: posts,
      });
    } catch (e) {
      res.status(500).json({
        message: "Error retrieving posts",
        error: e.message,
      });
    }
  });

  // Get a specific blog post by ID
  app.get("/blog/:postId", async function (req, res) {
    const postId = req.params.postId;

    try {
      const post = await blogModel.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json({
        message: "Fetched specific post",
        post: post,
      });
    } catch (e) {
      res.status(500).json({
        message: "Error retrieving post",
        error: e.message,
      });
    }
  });

  // Update a blog post
  app.put("/blog/:postId", async function (req, res) {
    const postId = req.params.postId;
    const { tile, content, coverImage, status } = req.body;

    try {
      const updatedPost = await blogModel.findByIdAndUpdate(
        postId,
        { tile, content, coverImage, status, updatedAt: new Date() },
        { new: true } // returns the updated document
      );
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json({
        message: "Blog post updated successfully",
        blog: updatedPost,
      });
    } catch (e) {
      res.status(500).json({
        message: "Error updating blog post",
        error: e.message,
      });
    }
  });

  // Delete a blog post
  app.delete("/blog/:postId", async function (req, res) {
    const postId = req.params.postId;

    try {
      const deletedPost = await blogModel.findByIdAndDelete(postId);
      if (!deletedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json({
        message: "Blog post deleted successfully",
      });
    } catch (e) {
      res.status(500).json({
        message: "Error deleting blog post",
        error: e.message,
      });
    }
  });
}

module.exports = {
  blogRouter: blogRouter,
};
