import React, {useState, useEffect} from 'react'
import {Form, Input, message} from 'antd';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import SubmitSpinner from '../components/SubmitSpinner';
import Logo from  '../assets/logo/ExpenseTracker.png'
import {BASE_URL} from '../services/Helper.js'




const Register = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    // form submit   antd takes values insted of events
const submitHandler = async (values) => {
 try{
    setLoading(true)
     await axios.post(`${BASE_URL}api/v1/users/register`, values)
     message.success('Registration Successfull')
    setLoading(false)
    navigate('/expense-tracker/user/login')
 }
 catch(error){
    //  Message.error(error.response.data.message)
    setLoading(false)
    message.error("Something Went Wrong")
     

 }
}

// prevent for if user login then user should not access register and login page till logout
useEffect(() =>{

    if(localStorage.getItem('user')){
      
        navigate('/')
    }  
}, [navigate])

  return (
    <>
<div className='register-page container-fluid d-flex justify-content-center '>
        <div className='row  d-flex justify-content-center ' style={{height:'70%', width:'100%'}}>
       <Form layout='vertical' onFinish={submitHandler} className='col-12 col-sm-8 col-md-6 col-lg-4 p-4 bx-sd2 bg-white rounded' > 
       <div className='d-flex justify-content-between'>
          <img src={Logo}/>
        <h4 className='text-center'>Register</h4>
          </div>
       <hr/>
        <Form.Item label='Name' name='name'>
            <Input  placeholder='Enter your name'     style={{ borderColor: '#333' }} required />
        </Form.Item>
        <Form.Item label='Email' name='email'>
            <Input  placeholder='Enter your email'     style={{ borderColor: '#333' }} required />
        </Form.Item>
        <Form.Item label='Password' name='password'>
            <Input  placeholder='Enter your password'     style={{ borderColor: '#333'}} required/>
        </Form.Item>
        <div className='d-flex justify-content-between'>
            <Link to='/expense-tracker/user/login'>Already Register? Click Here to Login </Link>
            {
              loading ? <SubmitSpinner/> :
              <button className='btn btn-primary' htmlType='submit'>
              Register
            </button>
            } 

        </div>
       </Form>
       </div>
     </div>   
    </>
  )
}

export default Register