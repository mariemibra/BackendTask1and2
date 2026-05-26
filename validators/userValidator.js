const Joi = require("joi");

// Sign Up
const signUpSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Sign In
const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Update User (اختياري)
const updateUserSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  password: Joi.string().min(6),
});

module.exports = {
  signUpSchema,
  signInSchema,
  updateUserSchema,
};