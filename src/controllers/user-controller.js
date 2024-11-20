import { User } from "../models/user-model.js";    
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Expense } from "../models/expense-model.js";
import { json } from "express";


export const regUser=asyncHandler(async(req,res)=>{
    const {username , password}=req.body;
    console.log({username:username,password:password})
    if(!username || username==="" || !password || password==="")
    {
        throw new ApiError(404,"Password or user field is empty")
    }
    const existedUser=await User.findOne({ username: username })
    if(existedUser){
        throw new ApiError(408,"User already exists");
    }
    
    
    const newUser=await User.create({
        name:username.toLowerCase(),
        password:password
    })
    
    if(!newUser)
        {throw new ApiError("400","User not created");}

    return res.status(200).json({newUser});

    })


 export const loginUser=asyncHandler(async(req,res)=>{
            
        const {username , password}=req.body;
        console.log({username:username,password:password})
        if(!username || username==="" || !password || password==="")
        {
            throw new ApiError(404,"Password or user field is empty")
        }
        const existedUser=await User.findOne({name:username});
        if(!existedUser){
            throw new ApiError(404,"User not found")
          }
        const checkPassword=await existedUser.checkPassword(password) 
        if(checkPassword===false){
            throw new ApiError(401,"Password is incorrect")
          }
          const {accessToken}=await generateAccToken(existedUser._id)

          const options={
            httpOnly:true,
            secure: true
          }
        res.cookie("accessToken",accessToken,options)
        res.status(200)
        .json({
            existedUser:username,
            accessToken:accessToken,
            success:true
        })
       
    })
    
    const generateAccToken=async(userId)=>{
      try {
          const user=await User.findById(userId)
              if(!user) throw new ApiError (404,"user Not found")
          const accessToken=await user.generateAccToken()
              return {accessToken}
      } catch (error) {
        console.log(error)
      }
    }

export    const addExpense=asyncHandler(async(req,res)=>{
        const user=await User.findById(req.user._id).select('-password')
        if (!user) {
            throw new ApiError(404, "User not found");
          }
          const { amount, description, category }=req.body
          if(isNaN(amount)|| description==="" ) throw new ApiError(404,"Please enter proper value")
        if(!category|| category==="") throw new ApiError(404,"Categories not provided")

            const newExp=await Expense.create({
                amount:amount,
                description:description,
                category:category.toLowerCase()
            })
            if(!newExp)
                {throw new ApiError("400","User not created");}
        
            return res.status(200).json({newExp,message:"Expense Added"});

    })

    export const updateExp=asyncHandler(async(req,res)=>{
        const user=await User.findById(req.user._id).select('-password')
        if (!user) {
            throw new ApiError(404, "User not found");
          }
          const {amount,description,date,category}=req.body
          
          let existedExp = await Expense.findOne({ date });
          if (!existedExp) {
              throw new ApiError(404, "Expense not found");
          }
          const updatedFields = {};
          if(description){
            updatedFields.description=description
          }
          if(amount){
            updatedFields.amount=amount
          }
          if(category){
            updatedFields.category=category
          }
          const updatedExp = await Expense.updateOne(
            { date }, // Filter by date or a more specific condition if needed
            {
                $set: { // Use $set to update fields
                   updatedFields
                }
            }
        );
    
        if (updatedExp.modifiedCount === 0) {
            throw new ApiError(500, "Expense update failed");
        }
    
        return res.status(200).json({message:"Expense Updated",updateExp});

    })
//From front if user Selects an option then He can direct click on delete obj fro api we can send date form and delete
    export const removeExp=asyncHandler(async (req,res) => {
        const user=await User.findById(req.user._id).select('-password')
        if (!user) {
            throw new ApiError(404, "User not found");
          }
          const {amount,description,date,category}=req.body
          
          const findExp=await Expense.findOne({
            $or: [{ amount }, { description }, { category }]
          });
            const deleteExp=await Expense.deleteOne({amount:findExp.amount,description:findExp.description,category:findExp.category,date:findExp.date})
          if (deleteExp.deletedCount === 0) {
            throw new ApiError(404, "Expense record not found or not deleted");
        }
 return res.status(200).json({
          message:"Record deleted"
        })
          

    })
export const weeklyExp=asyncHandler(async (req,res) => {
    const user=await User.findById(req.user._id).select('-password')
        if (!user) {
            throw new ApiError(404, "User not found");
          }
          const lastWeek = new Date();
lastWeek.setDate(lastWeek.getDate() - 7); 
          const weeklyExp = await Expense.aggregate([
            {
              $match: {
            createdAt: { $gte: lastWeek } // Match records created in the last 7 days
        }
            }
        ]);
        
    if (weeklyExp.length === 0) {
        throw new ApiError(404, "Weekly Expense not found");
      }
      return res.status(200).json({
        Success: true,
        exp: weeklyExp
      });
})

export const getPastOneMonth=asyncHandler(async (req,res) => {
    const user=await User.findById(req.user._id).select('-password')
        if (!user) {
            throw new ApiError(404, "User not found");
          }
          const lastMonth=new Date()
          lastMonth.setDate(lastMonth.getMonth()-1)
        const montlyexp=await Expense.aggregate([
            {
                $match:{
                    createdAt:{$gte:lastMonth}
                }
            }
        ])
  if(lastMonth.length===0) throw new ApiError(404,"Month Expense Not Found");
  return res.status(200).json({
   " Monthly Exp":montlyexp
  })
        
})
export const getPastThreeMonths=asyncHandler(async (req,res) => {
    const user=await User.findById(req.user._id).select('-password')
        if (!user) {
            throw new ApiError(404, "User not found");
          }
          const threeMonth=new Date()
          threeMonth.setDate(threeMonth.getMonth()-3)
        const montlyexp=await Expense.aggregate([
            {
                $match:{
                    createdAt:{$gte:threeMonth}
                }
            }
        ])
  if(threeMonth.length===0) throw new ApiError(404,"Month Expense Not Found");
  return res.status(200).json({
   " Past 3 Monthly Exp":montlyexp
  })
        
})

export const categoriesExp=asyncHandler(async (req,res) => {
    const user=await User.findById(req.user._id).select('-password')
        if (!user) {
            throw new ApiError(404, "User not found");
          }
          const category=req.body || req.params.description
          
          const categoryExp=await Expense.find(category)
          if(categoryExp.length===0) throw new ApiError(404,"Category Expenses not found")
            return res.status(200).json({category:category,Expenses:categoryExp})
})

export const apiDetails = asyncHandler(async (req, res) => {
  const resp = `
    Welcome to the Expense Tracker API!

    Before you begin using the API, please read the [API Documentation](https://your-repo-link-to-readme.md). This documentation provides detailed information on how to use the API, including available endpoints, request/response examples, authentication, error handling, and more.

    Here are the key sections to review:
    - Authentication and Authorization
    - Available API Endpoints
    - Request and Response Examples
    - Error Handling and Troubleshooting

    If you have any questions or need further assistance, please don’t hesitate to reach out.

    Happy coding!
  `;
  res.send(resp);
});

export const viewAllCategories=asyncHandler(async (req,res) => {
  const user=await User.findById(req.user._id).select('-password')
  if (!user) {
      throw new ApiError(404, "User not found");
    }
    const expenses=await Expense.find()
    const allCat={...expenses,category:expenses.category}
    res.status(200).json({
      "Categories":allCat
    })
})
