import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import LoginContext from './Store/LoginContext';

const Header = () => {

  return (
    <div className="HeaderContainer">
      <span className='TitleText'>MyWebLink</span>
      <span className='NavText'>Home</span>
      <span className='NavText'>Products</span>
      <span className='NavText'>About Us</span>
    </div>
  )
}

export default Header;