import { body } from "express-validator";

export const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Invalid Email"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters"),
];

export const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid Email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];