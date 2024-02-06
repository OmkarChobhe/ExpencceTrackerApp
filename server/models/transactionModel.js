const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userid:{
        type: String,
        required: [true, 'userid is required']
    },
    amount:{
        type: Number,
        required: [true, 'amount is required']
    },
    type:{
        type: String,
        required: [true, 'type is required']
    },
    category:{
        type: String,
        required: [true, 'category is required']
    },
  
    description:{
        type: String,
        required: [false, 'description is required']
    },
    date:{
        type: Date,
        required: [true, 'date is required']
    },

    

},{timestamps: true});



const transactionModel = mongoose.model('transaction', transactionSchema);
module.exports = transactionModel;


  // reference:{
    //     type: String,
    // },