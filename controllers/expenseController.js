import Expense from "../models/Expense.js";
import { validationResult } from "express-validator";
import { generateToken } from "../utils/jwt.js";

export const createExpense=async (req,res)=>{
    console.log('start creating the expense');
    try{
        const user=req.user.id;
        const{title,amount,type,category,note}=req.body;
        const expense=await Expense.create({title,amount,type,category,note,user});
        res.status(201).json({expense});
    }
    catch (err){
        res.status(500).json({message:err.message});
    }
    console.log('finsh creating the expense')
}

//  getExpenses give all the expenses
export const getExpenses=async (req,res)=>{
    console.log(' getExpenses is started');
    try{
        const allexpenes= await Expense.find();
        res.json({allexpenes});
    }
    catch(err){
        res.status(500).json({
            message:err.message,
            error:err
        })
    }
}

// getExpense , give the specific expense
export const getExpense=async (req,res)=>{
    console.log(' getExpense is started to colleect specific expense');
    try{
        // console.log(' hi ')
        const id=req.params.id;
        // console.log(id);
        const response=await Expense.findById(id);
        if(!response){
            return res.status(404).json({error:"noe expense of this id"});
        }
        res.status(200).json(response);

    }
     catch(err){
        res.status(500).json({
            message:err.message
        
        })
    }
    console.log('getExpense is finished to colleect specific expense ')
}
// deleteExpense to delete a expense
export const deleteExpense=async(req,res)=>{
    console.log(' deleteExpense is started to delete  specific expense');
    try{
        const id=req.params.id;
        
        const response= await Expense.findByIdAndDelete(id);
    
        console.log(response)
        if(!response)return res.status(404).json({error:" there is no such expense id "});
        res.status(200).json(response);
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
        
    }
    console.log(' deleteExpense  deleted  specific expense');
    
}