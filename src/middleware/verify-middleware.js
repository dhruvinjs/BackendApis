import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user-model.js" 
import { asyncHandler } from "../utils/asyncHandler.js"

export const verifyToken=asyncHandler(async(req,res,next)=>{
    const accessToken=req.cookies.accessToken
    if(!accessToken) throw new ApiError(404,"Token not found")
    const decodedToken=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)

    if(!decodedToken){
        throw new ApiError(404,"Unauthenthicated user")
    }

    const user = await User.findById(decodedToken._id).select('-password');
    if(!user) return next(new ApiError(401, 'Invalid Access Token'));

    req.user=user
    next()


})