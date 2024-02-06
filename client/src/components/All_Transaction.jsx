// import React, { useEffect } from "react";
// import { useState } from "react";
// import { message, Table } from "antd";
// import axios from "axios";
// import {useSelector, useDispatch} from 'react-redux'
// import {loadingSpinnerActive, setAllTransactions} from '../redux/expenseSlice.jsx'
// import Spinner from './Spinner.jsx'


// const All_Transaction = () => {

//     const {loadingSpinner, allTransactions} = useSelector(state => state.expense);

//     const dispatch = useDispatch();
  

//     const getAllTransactions = async () => {
//         try {
//             const user = JSON.parse(localStorage.getItem('user'));
//             dispatch(loadingSpinnerActive(true))
//             const res = await axios.post('http://localhost:8080/api/v1/transactions/get-transaction', {userid: user._id});
//             dispatch(loadingSpinnerActive(false))
//             dispatch(setAllTransactions(res.data))
//             console.log(res.data);
//         } catch (error) {
//             console.log(error);
//             message.error('Failed to fetch transactions');
//         }
//     }
    
    
//     useEffect(() => {
//     getAllTransactions();
    
//     },[allTransactions])
    
//     // table data

// const  columns = [
//     {
//         title: 'Date',
//         dataIndex: 'date',
//         key: 'date',
  
//     },
//     {
//         title: 'Amount',
//         dataIndex: 'amount',
//         key: 'amount',
//     },
//     {
//         title: 'Type',
//         dataIndex: 'type',
//         key: 'type',
//     },
//     {
//         title: 'Category',
//         dataIndex: 'category',
//         key: 'category',
//     },
   
//     {
//         title: 'Description',
//         dataIndex: 'description',
//         key: 'description',
//     },
//     // {
//     //     title: 'Reference',
//     //     dataIndex: 'reference',
//     //     key: 'reference',
//     // },
//     {
//         title: 'Actions',
  
//     },
// ]

    
    

//   return (
//  <>
 
//      <div className="content mt-3 ">
   
//         <Table columns={columns} dataSource={allTransactions} bordered />

//       </div>

//  </>
//   )
// }

// export default All_Transaction