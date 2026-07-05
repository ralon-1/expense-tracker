import express from "express";

import {
  register,
  login,
  profile,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";


import {
  registerValidator,
  loginValidator,
} from "../validators/authValidator.js";

const router = express.Router();

router.post(
  "/register",
  registerValidator,
  register
);

//  the loginvalidator is middleware 
// as it  passed in middle  

router.post(
  "/login",
  loginValidator,
  login
);

router.get(
  "/profile",
  authMiddleware,
  profile
);

export default router;