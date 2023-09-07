import React, { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { changePassword } from "../http/userAPI";
import "../pages/Profile.css";
import { observer } from "mobx-react-lite";

const ErrorMessage = ({ text }) => {
  if (!text) return null;
  return (
    <div className="profile-error-message">
      {text}
    </div>
  );
};

const ChangePassword = observer(() => {
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState([])

  const handleSubmitPasswordChange = async () => {
    let errors = [];
  
    if (newPassword.length < 8) {
      errors.push({ msg: "Password must be longer than 8 characters" });
    }
  
    if (newPassword === previousPassword) {
      errors.push({ msg: "New password should not be the same as the previous one" });
    }
  
    if (newPassword !== confirmPassword) {
      errors.push({ msg: "New password and confirmation do not match" });
    }
  
    setErrorMessage(errors);
    console.log(errorMessage)
    if(errors.length === 0){
      try {
        const response = await changePassword(previousPassword, newPassword)
        if(response.status===200){
          alert("Password changed successfully")
          setNewPassword("")
          setPreviousPassword("")
          setConfirmPassword("")
        }
        else{
          errors.push({msg: response.response.data.message})
          setErrorMessage(errors)
          console.log(errorMessage)
        }
      } catch (error) {
      } 
    }
  };

  return (
    <div className="">
      <div className="profile-h">
        <h2 className="">Change Password</h2>
      </div>
      <ul className="profile-ul">
        <li className="profile-ul-li">
      {errorMessage.map((error, index) => (
        <ErrorMessage key={index} text={error.msg} />
      ))}
        <div className="d-flex">
          <div className="li-div-header">Old Password:</div>
          <div className="li-div-content">
            <FormControl
              className="profile-inp input"
              type="password"
              value={previousPassword}
              onChange={(e) => setPreviousPassword(e.target.value)}
            />
          </div>
        </div> 
        </li>
        <li className="profile-ul-li">
          <div className="d-flex">          
            <div className="li-div-header">New Password:</div>
            <div className="li-div-content">
              <FormControl
                className="profile-inp input"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
        </li>
        <li className="profile-ul-li">
          <div className="d-flex">
            <div className="li-div-header">Confirm New Password:</div>
            <div className="li-div-content">
              <FormControl
                className="profile-inp input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            </div>
        </li>
      </ul>
      <Button onClick={handleSubmitPasswordChange} className="changePassword-btn">Send</Button>
    </div>
  );
})

export default ChangePassword;