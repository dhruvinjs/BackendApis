import mongoose from "mongoose";    

export async function connectDb(){
   try {
     const connectionInstance=await mongoose.connect(`${process.env.MONGO_URL}`)
     //Mongoose always return an objecvt when it connects an datbase so that why storing it in a variable
     console.log(`Mongo Db connection done at ${connectionInstance.connection.host}`);
 
   } catch (error) {
    console.log(error                                                                                      )
   }

}