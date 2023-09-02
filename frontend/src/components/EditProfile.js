import React from "react";
import { Button, FormControl } from "react-bootstrap";

const EditProfile = ({ email, setEmail, info, setInfo }) => {

  const fields = [
    { label: "E-mail:", value: email, onChange: setEmail },
    { label: "Info:", value: info, onChange: setInfo }
  ];

  const handleSaveChanges = () => {
    
  };

  return (
    <div className="">
      <div className="profile-h">
        <h2 className="">Edit profile</h2>
      </div>
      <ul className="profile-ul">
        {fields.map((field, index) => (
          <li key={index} className="profile-ul-li d-flex">
            <div className="li-div-header">{field.label}</div>
            <div className="li-div-content">
              <FormControl
                className="profile-inp input"   
                value={field.value} 
                onChange={field.onChange ? (e) => field.onChange(e.target.value) : null}
                readOnly={field.readOnly}
              />
            </div>
          </li>
        ))}
        
      </ul>
      <Button className="changePassword-btn" onClick={handleSaveChanges}>Send</Button>
    </div>
  );
};

export default EditProfile;