import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import LoginContext from './Store/LoginContext';

const Home = () => {

  const navigate = useNavigate();
  const loginCtx = useContext(LoginContext);

  const handleClick = () => {
    navigate('/Profile');
  }

  const handleVerifyEmail = async () => {
    await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCszasJf5BQUdZzWYKXbjjvKo5BlnvW79Q', {
      method: 'POST',
      body: JSON.stringify({
        requestType: 'VERIFY_EMAIL',
        idToken: loginCtx.token.idToken
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          loginCtx.handleIsVerified();
          console.log(data)
        })
      } else {
        res.json().then((data) => {
          console.log(data);
        })
      }
    })
  }

  return(
    <div className="HomeContainer">
      <span>Welcome to Expense Tracker!!!</span>
      {!loginCtx.isVerified && <button style={{cursor: 'pointer'}} onClick={handleVerifyEmail}>Verify email</button>}
      <section className='TextDecoration'>
        <span>Your profile is incomplete. </span>
        <span className='ClickableText' onClick={handleClick}>Complete now</span>
      </section>
    </div>
  )
}

export default Home;