// A file which will help to handle promises and can used to avoid the try catch block in every controller

export const asyncHandler=(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch(err=>{
            next(err)
        })
    }
}