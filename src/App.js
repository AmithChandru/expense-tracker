import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import LoginProvider from './components/Store/LoginProvider';

function App() {
  return (
    <div className="App">
      <LoginProvider>
        <BrowserRouter>
          {/* <Header /> */}
          <Routes>
            <Route path='/Login' element={<Login />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/' element={<Home />} />
            <Route path='/Profile' element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </div>
  );
}

export default App;
