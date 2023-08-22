import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react"
import { Button, Card, Container } from "react-bootstrap"
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { NavLink } from "react-router-dom";
import { Context } from ".."
import { registration } from "../http/userAPI";
import { REGISTRATION_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from "../utils/consts";

const Auth = observer(()=>{
    const {user} = useContext(Context)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const singIn = async () => {
        const response = await registration(email, password)
        console.log (response)
    }

    return (
        <Container 
        className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight - 60}}
        >
            <Card style={{width: 700}} className="p-4 ">
                {user.isReg ?
                <h2 className="m-auto "> Log In</h2> 
                :
                <h2 className="m-auto "> Registration</h2>
                }                    
                    <Form className="pt-3">
                        <Form.Group as={Row} className="mb-3" controlId="">
                            <Form.Label column sm="3">Email</Form.Label>
                            <Col sm="9">
                                <Form.Control 
                                    type="email" 
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="3">
                            Password
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        {user.isReg ?
                        <>
                            <Form.Group className="mt-3 d-flex justify-content-center align-items-center">
                                <NavLink to={MAIN_ROUTE}>
                                    <Button style={{ width: 200 }} onClick={() => { user.setIsAuth(true); } }>Send</Button>
                                </NavLink>

                            </Form.Group>
                                <Form.Group className="d-flex justify-content-center align-items-center">
                                    <NavLink onClick={() => { user.setIsReg(false); } } className="mt-3">Registration new account</NavLink>
                                </Form.Group>
                        </>
                        :
                        <>
                            <Form.Group className="mt-3 d-flex justify-content-center align-items-center">
                                <NavLink to={MAIN_ROUTE}>
                                    <Button style={{ width: 200 }} onClick={singIn}>Send</Button>
                                </NavLink>
                            </Form.Group>
                                <Form.Group className="d-flex justify-content-center align-items-center">
                                    <NavLink onClick={() => { user.setIsReg(true); } } className="mt-3">Log in</NavLink>
                                </Form.Group></>
                        }
   
                        </Form>   
                </Card>
        
        </Container>
    )
})

export default Auth