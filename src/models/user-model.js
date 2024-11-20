import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    password:{
        type:String,
        required:true
    },
})



userSchema.pre('save',
    async function (next){
        if(!this.isModified('password')) return next() 
            //Checks if password not modified then simply go to next function or if password modifed then hasH it
        const hashedPassword = await bcrypt.hash(this.password,10)
        console.log(`Hashed password: ${hashedPassword}`);
        this.password=hashedPassword
    next()
    })



userSchema.methods.checkPassword=async function(password) {
    return await bcrypt.compare(password,this.password)   
}



userSchema.methods.generateAccToken=async function(){
    return jwt.sign({
           _id:this._id,
           username:this.username,
       },process.env.ACCESS_TOKEN_SECRET    ,
   {
       expiresIn:'6h'
   },    
   )
   }

export const User=mongoose.model('User',userSchema)