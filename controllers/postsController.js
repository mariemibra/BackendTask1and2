const postsService = require("../services/postsService");

const createPost = async (req, res, next) => {

    const { title, content, category, author } = req.body;

    if (!title || !content || !author) {
        return res.status(400).json({
            message: "Please fill all the required fields"
        });
    }

    const post = await postsService.createPost({
        title,
        content,
        category,
        author
    });

    res.status(201).json({
        message: "Post Created Successfully",
        data: post
    });
};

const getAllPosts = async (req, res, next) => {

    const data = await postsService.getAllPosts(req.query);

    res.status(200).json({
        message: "Posts Fetched Successfully",
        data
    });
};

const getPostById = async (req, res, next) => {

    const { id } = req.params;

    const post = await postsService.getPostById(id);

    if (!post) {
        return res.status(404).json({
            message: "Post Not Found"
        });
    }

    res.status(200).json({
        message: "Post Fetched Successfully",
        data: post
    });
};

const updatePost = async (req, res, next) => {

    const { id } = req.params;

    const post = await postsService.updatePost(id, req.body);

    if (!post) {
        return res.status(404).json({
            message: "Post Not Found"
        });
    }

    res.status(200).json({
        message: "Post Updated Successfully",
        data: post
    });
};

const deletePost = async (req, res, next) => {

    const { id } = req.params;

    const post = await postsService.deletePost(id);

    if (!post) {
        return res.status(404).json({
            message: "Post Not Found"
        });
    }

    res.status(200).json({
        message: "Post Deleted Successfully"
    });
};

const updatePostById = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const post = await postService.updatePostById(
      req.params.id,
      req.body,
      userId
    );

    if (!post) {
      throw new APIError("Post not found", 404);
    }

    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

const deletePostById = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const post = await postService.deletePostById(req.params.id, userId);

    if (!post) {
      throw new APIError("Post not found", 404);
    }

    res.status(200).json({
      message: "Post deleted successfully",
      post,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById,
    updatePost,
    deletePost
};