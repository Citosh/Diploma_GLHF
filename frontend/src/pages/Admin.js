import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, Col } from "react-bootstrap";
import "./Profile.css";
import ChangePassword from "../components/ChangePassword";
import EditProfile from "../components/EditProfile";
import UserProfile from "../components/UserProfile";

const Admin = observer(() =>{
    const [target, setTarget] = useState(0);

    let content
    switch (target) {
      case 0:
        
        break;
      case 1:
          
        break;
      case 2:
        
        break;
      default:
        
    }
  
    return (
      <div className="contain">
          <div className="d-flex justify-content-between"> 
              <Col sm="2" className="btn-container">
                <div className="div">
                  <Button  className="custom-btn" onClick={()=> setTarget(0)}>All users</Button>
                </div>
                <div className="div">
                  <Button className="custom-btn" onClick={()=> setTarget(1)}>Baned users</Button>
                </div>
                <div className="div">
                  <Button className="custom-btn" onClick={()=> setTarget(1)}>Set role</Button>
                </div>
              </Col>
              <Col sm="10" className="profile-info">
                aaaa
              </Col>
          </div>  
      </div>
    );
  });

export default Admin