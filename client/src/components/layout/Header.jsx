import React,{useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button,message } from 'antd';
import { PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import Logo from  '../../assets/logo/ExpenseTracker.png'

const Header = () => {


  const [loginUser, setLoginUser] = useState('');
  const [loadings, setLoadings] = useState([]);
  const navigate = useNavigate();

  // logout button function  from antd
  const handleLogout = () => {
    // Set loading state to true
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[1] = true;
      return newLoadings;
    });
  
    // Remove user from local storage
    localStorage.removeItem('user');
  
    // Simulate an asynchronous logout process (e.g., API request, etc.)
    setTimeout(() => {
      // Set loading state back to false
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[1] = false;
        return newLoadings;
      });
  
      // Display success message
      message.success('Logout Successfully');
  
      // Navigate to the login page
      navigate('/expense-tracker/user/login');
    }, 2000); // Adjust the timeout as needed (simulating an asynchronous action)
  };
  



// getting user from localstorage for printing name in header
  useEffect(() => {
     const  user = JSON.parse(localStorage.getItem('user'));

     if(user){
      setLoginUser(user)
     }

  }, []);

 

  return (
   
    <>
      <nav className="navbar navbar-expand-lg  bx-sd2  ">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/"><img src={Logo}/></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll gap-3" style={{ '--bs-scroll-height': '100px' }}>
              <li className="nav-item d-flex align-items-center">
              <b><span className='text-white'><UserOutlined /> {loginUser.name}</span></b> 
              </li>
              <li className="nav-item">
         
              <Button
          className='bg-danger'
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loadings[1]}
          onClick={handleLogout}
         
        >
         Logout
        </Button>
                
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
