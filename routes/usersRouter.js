const { Router } = require("express");
const usersController = require("../controllers/usersController");

const auth = require("../middlewares/auth");
const authorizeTo = require("../middlewares/authorizeTo");
const validationMiddleware = require("../middlewares/validationMiddleware");

const {
  signUpSchema,
  signInSchema,
  updateUserSchema,
} = require("../validators/userValidator");

const router = Router();


// Sign Up
router.post(
  "/sign-up",
  validationMiddleware(signUpSchema),
  usersController.signUp
);

// Sign In
router.post(
  "/sign-in",
  validationMiddleware(signInSchema),
  usersController.signIn
);


// Get all users
router.get(
  "/",
  auth,
  authorizeTo(["admin"]),
  usersController.getAllUsers
);

// Get user by ID
router.get(
  "/:id",
  auth,
  authorizeTo(["admin"]),
  usersController.getUserById
);

// Update user
router.patch(
  "/:id",
  auth,
  authorizeTo(["admin"]),
  validationMiddleware(updateUserSchema),
  usersController.updateUser
);

// Delete user
router.delete(
  "/:id",
  auth,
  authorizeTo(["admin"]),
  usersController.deleteUser
);

module.exports = router;