import User from "../models/User.js";
import { validationResult } from "express-validator";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
    console.log('start registering the user');
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken({
      id: user._id,
    });

    res.status(201).json({
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    
    console.log('login validator successs ')
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token = generateToken({
      id: user._id,
    });

    res.json({
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const profile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json(user);
};