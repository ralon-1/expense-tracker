import express from 'express';
import {
    createExpense,getExpenses,getExpense,deleteExpense
} from "../controllers/expenseController.js";

import authMiddleware from '../middleware/authMiddleware.js';

const router=express.Router();


// routes 

// POST /api/expenses
router.post("/", authMiddleware, createExpense);

// GET /api/expenses
router.get("/",authMiddleware, getExpenses);

// GET /api/expenses/:id
router.get("/:id",authMiddleware, getExpense);

// // PUT /api/expenses/:id
// router.put("/:id", authMiddleware, updateExpense);

// DELETE /api/expenses/:id
router.delete("/:id",authMiddleware, deleteExpense);

// router.post('/register',authMiddleware,createExpense);
export default router;