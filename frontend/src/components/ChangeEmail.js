import React, {useState} from "react";
import "../pages/Profile.css";
import { observer } from "mobx-react-lite";
import { Button, FormControl } from "react-bootstrap";



const ChangeEmail = observer((userinfo) => {
    const [newEmail, setNewEmail] = useState("");
    const [password, setPassword] = useState("");
    const email = userinfo.userinfo.email

  return (
    <div className="">
      <div className="profile-h">
        <h2 className="">Change E-mail</h2>
      </div>
      <ul className="profile-ul">
        <li className="profile-ul-li">
      {/* {errorMessage.map((error, index) => (
        <ErrorMessage key={index} text={error.msg} />
      ))} */}
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
      <Button className="changePassword-btn">Send</Button>
    </div>
  );
})

export default ChangeEmail;