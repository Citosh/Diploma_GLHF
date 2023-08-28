import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { Context } from "..";
import { registration, login} from "../http/userAPI";
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
            if(user.isReg) {
                response = await login(email, password);
                user.setIsAuth(true);
                navigate(MAIN_ROUTE);
            } else {
                await registration(email, password);
                alert("Registration successful! Please log in.")
                setMessage('');
                setPassword('')
                user.setIsReg(true)
                navigate(LOGIN_ROUTE);
            }
        } catch (error) {
            {error.response.data.errors ? 
                setMessage(error.response.data.errors.errors) 
                : 
                setMessage([{msg: error.response.data}])}
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 60 }}>
            <Card style={{ width: 700 }} className="p-4">
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
                            <Form.Control type="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">Password</Form.Label>
                        <Col sm="9">
                            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mt-3 d-flex justify-content-center align-items-center">
                        <Button style={{ width: 200 }} onClick={handleAuthentication}>Send</Button>
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-center align-items-center">
                        <NavLink onClick={() => (user.setIsReg(!user.isReg), setMessage(''))} className="mt-3">{user.isReg ? "Create new account" : "Log in"}</NavLink>
                    </Form.Group>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;