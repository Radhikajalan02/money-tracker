// if we change something in the index file we need to run node index.js again that is startr the express server again but it would be much better to use nodemon index.js so after using nodemon we just need to reload the browser 

import express from "express"
import cors from "cors"; //cors allows our frontend app to talk to our backend app
import Transaction from "./models/transaction.js"
import dotenv from "dotenv";
dotenv.config();
const app=express()
import mongoose from "mongoose"
app.use(cors());
app.use(express.json()); //gives preview

app.get('/api/test',(req,res)=>{
    res.json({body :'test ok'});
})//defining api endpoint with an arrow function having request and response as params called handlers 

// we have made a form and we need an endpoint for posting a new transaction
app.post("/api/transaction",   
    //handlers
     async (req,res)=>{
         await mongoose.connect(process.env.MONGO_URL)
        try{ const {name,description,datetime,price}=req.body;
       const transaction= await Transaction.create({name,description,datetime,price})

       res.json(transaction);
        // console.log(process.env.MONGO_URL)
      
       //we get all the information of our react app inside req.body
     }catch(error){
    console.error(error);
    res.status(500).json({ error: "Server error" });
     }
  })

async function getTransactions(req, res){
    await mongoose.connect(process.env.MONGO_URL)
    const transactions = await Transaction.find({});
    res.status(200).json(transactions);
    console.log(transactions)
}

app.get('/api/transaction', getTransactions) //defining the endpoint for getting all transactions


app.listen(4040,()=>{
    console.log("server is running on port 4040")
}); //defining the listening port for our nackend express app