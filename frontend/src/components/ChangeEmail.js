import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Profile.css";
import { observer } from "mobx-react-lite";
import { Button, FormControl } from "react-bootstrap";
import { changeEmail } from "../http/userAPI";
import { ErrorMessage } from "./Errors";
import { Context } from "..";
import { LOGIN_ROUTE } from "../utils/consts";

const ChangeEmail = observer((userinfo) => {
    const [newEmail, setNewEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState([])
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const email = userinfo.userinfo.email

    const handleSubmitEmailChange = async () => {
      let errors = [];
      try {
        const response = await changeEmail(newEmail, password)
        if(response.status === 200){
          alert("E-mail changed successfully! Please log in.")
          user.setIsAuth(false);
          user.setIsAdmin(false);
          user.setIsReg(true);
          localStorage.removeItem("user")
          navigate(LOGIN_ROUTE);
        }
        else{
          errors.push({msg: response.response.data.message})
          setErrorMessage(errors)
        }
        console.log(response)
      } catch (error) {

      }

    };

  return (
    <div className="">
      <div className="profile-h">
        <h2 className="">Change E-mail</h2>
      </div>
      <ul className="profile-ul">
        <li className="profile-ul-li">
          {errorMessage.map((error, index) => (
            <ErrorMessage className= {"profile-error-message"} key={index} text={error.msg} />
          ))}
          <div className="d-flex">
            <div className="li-div-header">Old E-mail:</div>
            <div className="li-div-content">
              {email}
            </div>
          </div> 
        </li>
        <li className="profile-ul-li">
          <div className="d-flex">          
            <div className="li-div-header">New E-mail:</div>
            <div className="li-div-content">
              <FormControl
                className="profile-inp input"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
          </div>
        </li>
        <li className="profile-ul-li">
          <div className="d-flex">
            <div className="li-div-header">Password:</div>
            <div className="li-div-content">
              <FormControl
                className="profile-inp input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            </div>
        </li>
      </ul>
      <Button onClick={handleSubmitEmailChange} className="changePassword-btn">Send</Button>
    </div>
  );
})

export default ChangeEmail;