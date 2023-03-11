import { useState } from "react";
import LoginContext from "./LoginContext";

const LoginProvider = (props) => {

  const [token, setToken] = useState(null);

  const handleLogout = () => {
    setToken(null);
  }

  const handleLogin = (item) => {
    setToken(item);
  }

  const LoginCtx = {
    token: token,
    handleLogin: handleLogin,
    handleLogout: handleLogout
  }

  return (
    <LoginContext.Provider value={LoginCtx}>
      {props.children}
    </LoginContext.Provider>
  )
}

export default LoginProvider;