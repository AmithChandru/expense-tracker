import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import LoginContext from './Store/LoginContext';

const Header = () => {

  const loginCtx = useContext(LoginContext);
  
  const handleLogout = () => {
    loginCtx.handleLogout();
  }

  return (
    <div className="HeaderContainer">
      <span className='TitleText'>MyWebLink</span>
      <span className='NavText'>Home</span>
      <span className='NavText'>Products</span>
      <span className='NavText'>About Us</span>
      <NavLink to='/Login'>
        {loginCtx.token && <button className='LogoutButton' onClick={handleLogout}>Logout</button>}
      </NavLink>
    </div>
  )
}

export default Header;