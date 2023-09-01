import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../pages/Profile.css";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmitPasswordChange = () => {
    if (newPassword === confirmPassword) {
      
    } else {
      alert("New passwords do not match!");
    }
  };

  return (
    <div className="">
      <div className="profile-h">
        <h2 className="">Change Password</h2>
      </div>
      <ul className="profile-ul">
      <li className="profile-ul-li d-flex">
              <div className="li-div-header">Old Password:</div>
              <div className="li-div-content">
                <input 
                  type="password" 
                  value={oldPassword} 
                  onChange={(e) => setOldPassword(e.target.value)} 
                />
              </div>
            </li>
            <li className="profile-ul-li d-flex">
              <div className="li-div-header">New Password:</div>
              <div className="li-div-content">
                <input 
                  type="password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                />
              </div>
            </li>
            <li className="profile-ul-li d-flex">
              <div className="li-div-header">Confirm New Password:</div>
              <div className="li-div-content">
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                />
              </div>
            </li>
      </ul>
      <Button onClick={handleSubmitPasswordChange} className="changePassword-btn">Send</Button>
    </div>
  );
};

export default ChangePassword;