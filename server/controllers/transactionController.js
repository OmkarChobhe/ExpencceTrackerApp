const moment = require('moment')

const transactionModel = require('../models/transactionModel')



const getAlltransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    console.log(selectedDate)
    const transactions = await transactionModel.find({
      ...(frequency !== 'custom'
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), 'd').toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== 'all' ? { type } : {})
    }).sort({ date: 'desc' });

    console.log(req.body); // Log the request body for debugging
    console.log(transactions);
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const addtransaction = async (req, res) => {
    try{
        const newTransaction = new transactionModel(req.body)

        await newTransaction.save();
        res.status(201).send('Transaction Created')

    }
    catch(error){
        res.status(500).json(error)
    }
}
// edit Controller
const edittransaction = async (req, res) =>{
try{
  await transactionModel.findByIdAndUpdate({_id:req.body.transactionId}, req.body.payload)
  res.status(200).send('Transaction Updated')
}
catch(error){
console.log(error)
res.status(500).json(error)
}
}

// delete Controller
const deletetransaction = async (req, res) =>{
  try{
    await transactionModel.findOneAndDelete({_id:req.body.transactionId})
    res.status(200).send('Transaction Deleted')
  }
  catch(error){
  console.log(error)
  res.status(500).json(error)
  }
  }
  

module.exports = {getAlltransaction,addtransaction , edittransaction, deletetransaction}