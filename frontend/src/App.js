import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from 'react-router-dom';
import { Context } from ".";
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import { check } from "./http/userAPI";

const App = observer(() =>{
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data=>{
      if(data.status < 400){
        user.setIsAuth(true)
        if(data.role === "ADMIN")
          user.setIsAdmin(true)
      }
      else{
        user.setIsAuth(false);
        user.setIsAdmin(false);
        user.setIsReg(true);
        localStorage.removeItem("user")
      }
    }).finally(()=> setLoading(false))
  }, [user])

  if(loading){
    return <Spinner animation={"grow"}></Spinner>
  }

  return (
      <BrowserRouter>
        <Navbar></Navbar>
        <AppRouter/>
      </BrowserRouter>
  );
}
)

export default App;
