const mongoose= require("mongoose")

const connectDB= async()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI,{ //edit username and password both by removing <> tag in .env file
           
          
        });

  console.log(`MongoDB has been Connected: ${conn.connection.host}`.yellow.bold)
    } catch(error){
        console.log(`Error is :${error.message}`.red.bold)
        process.exit()


    }
}

module.exports=connectDB