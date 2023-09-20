import React from "react";

const UserProfile = ({ userinfo }) => {
  console.log(userinfo)
  const userFields = [
    { label: "UID:", value: userinfo.id },
    { label: "E-mail:", value: userinfo.email },
    { label: "Company:", value: userinfo.info?.companyname },
    { label: "Phone Number:", value: userinfo.info?.phonenumber },
  ];

  return (
    <div className="">
      <div className="profile-h">
        <h2 className="">Your profile</h2>
      </div>
      <ul className="profile-ul">
        {userFields.map((field, index) => (
          <li key={index} className="profile-ul-li d-flex">
            <div className="li-div-header">{field.label}</div>
            <div className="li-div-content">{field.value}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;