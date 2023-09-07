import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, Col } from "react-bootstrap";
import "./Profile.css";
import ChangePassword from "../components/ChangePassword";
import EditProfile from "../components/EditProfile";
import UserProfile from "../components/UserProfile";
import ChangeEmail from "../components/ChangeEmail";

const Profile = observer(() => {
  const profileButtonRef = useRef(null);
  const userinfo = JSON.parse(localStorage.user)

  const [target, setTarget] = useState(0);
  const [info, setInfo] = useState(userinfo.info || "");
  const [lastName, setLastName] = useState(userinfo.lastName || "");
  const [surname, setSurname] = useState(userinfo.surname || "");
  const [phone, setPhone] = useState(userinfo.phone || "");

  useEffect(() => {
    profileButtonRef.current.focus();
  }, []);


  let content;
  switch (target) {
    case 0:
      content = <UserProfile userinfo={userinfo} />
      break;
    case 1:
      content = (
        <EditProfile
          info={info}
          setInfo={setInfo}
          lastName={lastName}
          setLastName={setLastName}
          surname={surname}
          setSurname={setSurname}
          phone={phone}
          setPhone={setPhone}
        />
      );
      break;
    case 2:
      content = (<ChangePassword/>)
      break;

    case 3:
      content = (<ChangeEmail userinfo={userinfo} />)
      break;
    default:
      content = <div>Select an option</div>;
  }

  return (
    <div className="contain">
        <div className="d-flex justify-content-between"> 
            <Col sm="2" className="btn-container">
              <div className="div">
                <Button ref={profileButtonRef} className="custom-btn" onClick={()=> setTarget(0)}>Profile</Button>
              </div>
              <div className="div">
                <Button className="custom-btn" onClick={()=> setTarget(1)}>Edit profile</Button>
              </div>
              <div className="div">
                <Button className="custom-btn" onClick={()=> setTarget(2)}>Change password</Button>
              </div>
              <div className="div">
                <Button className="custom-btn" onClick={()=> setTarget(3)}>Change e-mail</Button>
              </div>
            </Col>
            <Col sm="10" className="profile-info">
              {content}
            </Col>
        </div>  
    </div>
  );
});

export default Profile;