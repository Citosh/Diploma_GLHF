import React, { useContext } from "react"
import { Context } from ".."
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap"
import { observer } from "mobx-react-lite";
import { REGISTRATION_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from "../utils/consts";



 
const NavBar = observer(() => {
    const {user} = useContext(Context)
    return (
      <Navbar bg="dark" data-bs-theme="dark">
        <Container >
          <NavLink to={MAIN_ROUTE}>Home</NavLink>
            {user.isAuth ? 
              <Nav className="ms-auto">
                <NavLink >
                  <Button style={{width:100}}> Profile</Button>
                </NavLink>
                <NavLink to={MAIN_ROUTE}>
                  <Button onClick={()=> user.setIsAuth(false)} className="ms-2" style={{width:100}} >Log out </Button>
                </NavLink>
              </Nav>
              :
              <Nav className="ms-auto">
                <NavLink to={REGISTRATION_ROUTE}>
                  <Button onClick={()=> user.setIsReg(false)} style={{width:100}}>Sign Up </Button>
                </NavLink>
                <NavLink  to={LOGIN_ROUTE}>
                  <Button onClick={()=> user.setIsReg(true)} className="ms-2" style={{width:100}}> Log In</Button>
                </NavLink>
                
              </Nav>
            } 
        </Container>
      </Navbar>
    )
})

export default NavBar
