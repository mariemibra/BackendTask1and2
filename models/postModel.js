const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 5
        },

        content: {
            type: String,
            required: true,
            minlength: 10
        },

        category: {
            type: String,
            enum: ["Tech", "Life", "Health", "Education"],
            default: "Life"
        },

        author: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

// create post model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;