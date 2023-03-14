import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import { authActions } from './components/Store/AuthReducer';
import LoginContext from './components/Store/LoginContext';
import LoginProvider from './components/Store/LoginProvider';
import { themeActions } from './components/Store/ThemeReducer';

function App() {

  const loginCtx = useContext(LoginContext);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isPremium = useSelector(state => state.theme.isPremium);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(isPremium)
  })
  
  const handleLogout = () => {
    loginCtx.handleLogout();
    dispatch(authActions.logout);
  }

  const handleThemeClick = () => {
    dispatch(themeActions.setDarkTheme);
  }

  return (
    <div className="App" style={{backgroundColor: `${isPremium ? '#1a1816' : 'white'}`, color: `${isPremium ? 'white' : 'black'}`}}>
      <LoginProvider>
        <BrowserRouter>
          {/* <Header /> */}
          <Routes>
            <Route path='/Login' element={<Login />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/' element={<Home />} />
            <Route path='/Profile' element={<Profile />} />
          </Routes>
          <NavLink to='/Login'>
            {isAuthenticated && <button className='LogoutButton' onClick={handleLogout}>Logout</button>}
          </NavLink>
          <button className='PremiumButton' onClick={handleThemeClick}>Dark theme</button>
        </BrowserRouter>
      </LoginProvider>
    </div>
  );
}

export default App;
