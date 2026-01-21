const mongoose = require("mongoose");

// Define the structure of a Post
const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// Export the Post model
module.exports = mongoose.model("Post", PostSchema);
