const { Router } = require("express");

const postsController = require("../controllers/postsController");
const auth = require("../middlewares/auth");

const validationMiddleware = require("../middlewares/validationMiddleware");
const postSchema = require("../validators/postValidator");
const router = Router();

router.post("/", auth, postsController.createPost);

router.get("/", auth, postsController.getAllPosts);

router.get("/:id", auth, postsController.getPostById);

router.put("/:id", auth, postsController.updatePost);

router.delete("/:id", auth, postsController.deletePost);

router.patch("/:id",auth,validationMiddleware(postSchema),postsController.updatePostById);

router.delete("/:id",auth,postsController.deletePostById);

router.post("/",validationMiddleware(postSchema), postsController.createPost);

module.exports = router;
