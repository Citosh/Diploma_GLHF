import React, { useContext } from "react";
import { Context } from "..";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { REGISTRATION_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE } from "../utils/consts";
import { getUserById } from "../http/userAPI";
import "./NavBar.css";


const NavBar = observer(() => {
    const {user} = useContext(Context);

    return (
        <Navbar>
            <div className="nav-container d-flex justify-content-between">
                <NavLink to={MAIN_ROUTE}>Home</NavLink>
                {user.isAuth ? 
                    <Nav className="ms-auto">
                        <NavLink to={PROFILE_ROUTE}>
                            <Button className="button" onClick={getUserById}>Profile</Button>
                        </NavLink>
                        <NavLink to={LOGIN_ROUTE}>
                            <Button onClick={() => {
                                user.setIsAuth(false);
                                user.setIsReg(true);
                            }} className="button ms-2" >Log out</Button>
                        </NavLink>
                    </Nav>
                    : 
                    <Nav className="ms-auto">
                        <NavLink to={REGISTRATION_ROUTE}>
                            <Button onClick={() => user.setIsReg(false)} className="button">Sign Up</Button>
                        </NavLink>
                        <NavLink to={LOGIN_ROUTE}>
                            <Button onClick={() => user.setIsReg(true)} className="button ms-2" >Log In</Button>
                        </NavLink>
                    </Nav>
                }
            </div>
        </Navbar>
    );
});

export default NavBar;