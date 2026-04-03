// import {model,Schema} from "mongoose";

// const TransactionSchema = new Schema({
//     name:{type:String,required:true},
//     description:{type:String,required:true},
//     datetime:{type:Date,required:true},

// });

// const TransactionModel = model('Transaction',TransactionSchema)

// module.exports = TransactionModel;

import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  name: String,
  description: String,
  datetime: Date,
  price:Number,
});

const TransactionModel = mongoose.model("Transaction", TransactionSchema);

export default TransactionModel;