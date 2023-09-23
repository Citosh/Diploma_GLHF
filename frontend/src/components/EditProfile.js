import React, { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import "../pages/Profile.css";
import { getUserById, updateInformation } from "../http/userAPI"; 
import { ErrorMessage } from "./Errors";

const EditProfile = ({ companyName, setCompanyName, phone, setPhone }) => {

  const fields = [
    { label: "Company:", value: companyName, onChange: setCompanyName,  },
    { label: "Phone:", value: phone, onChange: setPhone, type: "tel", placeholder:"+380123456789" },
  ];

  const [errorMessage, setErrorMessage] = useState([]);

  const handleSaveChanges = async () => {
    try {
      let errorData = []
      const response = await updateInformation(companyName, phone);
      if (response.status != 200) {
        errorData = response?.response?.data?.message;
        setErrorMessage([{msg: errorData || "Unknown error occurred." }]);
      } else {
        await getUserById()
        setErrorMessage(null);
      }
    } catch (error) {
      setErrorMessage([{msg: error.message}]);
    }
  };

  return (
    <div className="">
      <div className="profile-h">
        <h2 className="">Edit profile</h2>
      </div>

      <ul className="profile-ul">
      {errorMessage != null && errorMessage.map((error, index) => (
        <ErrorMessage className= {"profile-error-message"} key={index} text={error.msg} />
      ))}
        {fields.map((field, index) => (
          <li key={index} className="profile-ul-li d-flex">
            <div className="li-div-header">{field.label}</div>
            <div className="li-div-content">
            <FormControl
                type={field.type || "text"} 
                placeholder={field.placeholder || ""} 
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