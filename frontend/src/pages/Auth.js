import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode"

import { Context } from "..";
import { registration, login, getUserById} from "../http/userAPI";
import { MAIN_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import "./Auth.css";

const Auth = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState([]);

    const handleAuthentication = async () => {
        try {
            let response
            let errors = []
            if(user.isReg) {
                response = await login(email, password);
                const {role} = jwt_decode(response.data.token)
                if(response.status < 400){
                    await getUserById()
                    user.setIsAuth(true);
                    if(role === "ADMIN")
                        user.setIsAdmin(true)
                    navigate(MAIN_ROUTE);
                }
                else {
                    errors.push({msg: response.response.data.message})
                    setMessage(errors)
                }
            } else {
                response = await registration(email, password);
                if(response.status<400){
                    alert("Registration successful! Please log in.")
                    setMessage('');
                    setPassword('')
                    user.setIsReg(true)
                    navigate(LOGIN_ROUTE);
                }
                else {
                    if(response.response.data.errors.length === 0){
                        errors.push({msg: response.response.data.message})
                    }
                    else 
                        errors.push({msg: response.response.data.errors.errors[0].msg})
                
                    setMessage(errors)
                }
            }
        } catch (error) {
           
        }
    }

    return (
        <div className="contain">
            <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 60 }}>
                <Card style={{ width: 700 }} className="p-4 " >
                    <h2 className="m-auto">{user.isReg ? "Log In" : "Registration"}</h2>
                    
                    {message.length > 0 && (
                        <div className="error_message mt-3">
                            {message.map((element, index) => (
                                <div key={index} style={{ textAlign: "center" }}>
                                    <p>{element.msg}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <Form className="pt-3">
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">Email</Form.Label>
                            <Col sm="9">
                                <Form.Control className="input" type="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="3">Password</Form.Label>
                            <Col sm="9">
                                <Form.Control className="input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group className="mt-3 d-flex justify-content-center align-items-center">
                            <Button style={{ width: 200 }} className="button" onClick={handleAuthentication}>Send</Button>
                        </Form.Group>

                        <Form.Group className="d-flex justify-content-center align-items-center">
                            <NavLink onClick={() => (user.setIsReg(!user.isReg), setMessage(''))} className="mt-3 nav_link">{user.isReg ? "Create new account" : "Log in"}</NavLink>
                        </Form.Group>
                    </Form>
                </Card>
            </Container>
        </div>
    );
});

export default Auth;