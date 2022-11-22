import AuthContext from "./AuthContext";
import React, { useState } from "react";

export default function AuthState(props) {
  let [loggedIn, setLoggedIn] = useState(false);
  return (
    <AuthContext.Provider
      value={{ loggedIn,setLoggedIn }}
    >
      {props.children}
    </AuthContext.Provider>
  );

}