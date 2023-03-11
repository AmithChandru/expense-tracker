import React from "react";

const LoginContext = React.createContext({
  token: [],
  handleLogin: () => {},
  handleLogout: () => {},
  isVerified: null,
  handleIsVerified: () => {}
})

export default LoginContext;