import { useState } from "react";
import LoginContext from "./LoginContext";

const LoginProvider = (props) => {

  const [token, setToken] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleLogout = () => {
    setToken(null);
  }

  const handleLogin = (item) => {
    setToken(item);
  }

  const handleIsVerified = () => {
    setIsVerified(true);
  }

  const LoginCtx = {
    token: token,
    handleLogin: handleLogin,
    handleLogout: handleLogout,
    isVerified: isVerified,
    handleIsVerified: handleIsVerified
  }

  return (
    <LoginContext.Provider value={LoginCtx}>
      {props.children}
    </LoginContext.Provider>
  )
}

export default LoginProvider;