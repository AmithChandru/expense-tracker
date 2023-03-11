import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Profile');
  }

  return(
    <div className="HomeContainer">
      <span>Welcome to Expense Tracker!!!</span>
      <section className='TextDecoration'>
        <span>Your profile is incomplete. </span>
        <span className='ClickableText' onClick={handleClick}>Complete now</span>
      </section>
    </div>
  )
}

export default Home;