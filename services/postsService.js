const Post = require("../models/postModel");

const createPost = async (data) => {
    try {
        const createdPost = await Post.create(data);

        return createdPost;
    } catch (error) {
        throw error;
    }
};

const getAllPosts = async (query) => {
    try {
        const { page = 1, limit = 10 } = query;

        /**
         * 1 page => first 10 | skip 0 limit 10
         * 2 page => next 10 | skip 10 limit 10
         * 3 page => next 10 | skip 20 limit 10
         */

        const skip = (page - 1) * limit;

        const posts = await Post.find()
            .skip(skip)
            .limit(limit);

        const totalCount = await Post.countDocuments();

        const pagination = {
            page: Number(page),
            limit: Number(limit),
            totalCount,
            totalPages: Math.ceil(totalCount / limit)
        };

        return { posts, pagination };

    } catch (error) {
        throw error;
    }
};

const getPostById = async (id) => {
    try {
        const post = await Post.findById(id);

        return post;
    } catch (error) {
        throw error;
    }
};

const updatePostById = async (id, data, userId) => {
  const post = await Post.findById(id);

  if (!post) return null;

  if (post.userId.toString() !== userId.toString()) {
    throw new APIError("Forbidden", 403);
  }

  const updatedPost = await Post.findByIdAndUpdate(id, data, {
    new: true,
  });

  return updatedPost;
};

const updatePost = async (id, data) => {
    try {

        const update = {
            title: data.title,
            content: data.content,
            category: data.category,
            author: data.author
        };

        const post = await Post.findByIdAndUpdate(
            id,
            update,
            { new: true, runValidators: true }
        );

        return post;

    } catch (error) {
        throw error;
    }
};


const deletePostById = async (id, userId) => {
  const post = await Post.findById(id);

  if (!post) return null;

  if (post.userId.toString() !== userId.toString()) {
    throw new APIError("Forbidden", 403);
  }

  await Post.findByIdAndDelete(id);

  return post;
}; 


const deletePost = async (id) => {
    try {

        // if post exists return it then delete it
        // if not exists returns null

        const post = await Post.findOneAndDelete({
            _id: id
        });

        return post;

    } catch (error) {
        throw error;
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    updatePost,
    deletePostById,
    deletePost
};