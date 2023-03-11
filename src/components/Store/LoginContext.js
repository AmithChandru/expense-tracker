import React from "react";

const LoginContext = React.createContext({
  token: [],
  handleLogin: () => {},
  handleLogout: () => {}
})

export default LoginContext;