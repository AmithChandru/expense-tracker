import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import LoginContext from './Store/LoginContext';

const Login = () => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const LoginCtx = useContext(LoginContext);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/Signup');
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCszasJf5BQUdZzWYKXbjjvKo5BlnvW79Q', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          LoginCtx.handleLogin(data);
          console.log(data);
          navigate('/');
        })
      } else {
        res.json().then((data) => {
          alert(data.error.message);
        })
      }
    })
  }

  const handleForgotPassword = () => {}

  return (
    <div style={{ position: 'absolute', top: '30%', left: '40%' }}>
      <div className='SignupModal'>
        <span style={{ fontSize: '30px', fontWeight: '600', marginTop: '10px' }}>Login</span>
        <form className='SignupForm' onSubmit={handleLogin}>
          <input className='SigninInput' type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          <input className='SigninInput' type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
          <button className='SignupButton' type='submit'>Login</button>
          <span className='ForgotPassword' onClick={handleForgotPassword}>Forgot Password?</span>
        </form>
      </div>
      <button className='LoginButton' onClick={handleNavigate}>
        Don't have an account? Sign up
      </button>
    </div>
  )
}

export default Login;