const express = require('express');
const { addtransaction, getAlltransaction, edittransaction , deletetransaction} = require('../controllers/transactionController');

const router = express.Router();


// add transaction
router.post('/add-transaction', addtransaction);

// Edit transaction
router.post('/edit-transaction', edittransaction);

// get all transaction
router.post('/get-transaction', getAlltransaction);

// Delete transaction
router.post('/delete-transaction', deletetransaction);




module.exports = router;