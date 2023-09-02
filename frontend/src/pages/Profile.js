import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, Col } from "react-bootstrap";
import "./Profile.css";
import ChangePassword from "../components/ChangePassword";
import EditProfile from "../components/EditProfile";
import UserProfile from "../components/UserProfile";

const Profile = observer(() => {
  const [target, setTarget] = useState(0);
  const profileButtonRef = useRef(null);
  const userinfo = JSON.parse(localStorage.user)
  const [email, setEmail] = useState(userinfo.email);
  const [info, setInfo] = useState(userinfo.info || "");


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
          email={email}
          setEmail={setEmail}
          info={info}
          setInfo={setInfo}
        />
      );
      break;
    case 2:
      content = (<ChangePassword/>)
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
            </Col>
            <Col sm="10">
              {content}
            </Col>
        </div>  
    </div>
  );
});

export default Profile;