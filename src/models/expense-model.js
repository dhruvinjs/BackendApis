import mongoose from "mongoose";
const d=new Date()
const expenseSchema=new mongoose.Schema({
    amount: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      date: {
        type: String,
       
        default: String(d.getFullYear())+'/'+String(d.getMonth())+"/"+String(d.getDay()),
        // default:Date.now()

      },
      createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
      },
     category:{
      type:String,
      required:true
     }

},{timestamps:true})

export const Expense= mongoose.model('expenseSchema',expenseSchema)