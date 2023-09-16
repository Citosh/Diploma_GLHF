import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, Col, NavLink } from "react-bootstrap";
import "./Profile.css";
import AllUsers from "../admin_components/AllUsers";
import { getAllUsers } from "../http/adminAPI";
import SetRole from "../admin_components/SetRole";
import { ALL_USERS, SET_ROLE } from "../utils/consts";
import BannedUsers from "../admin_components/BannedUser";

const Admin = observer(() =>{
    const [target, setTarget] = useState(0);
    
    const getUsers = async () => {
      try {
        await getAllUsers()
      } catch (error) {
        console.log(error)
      }
    }

    let content
    switch (target) {
      case 0:
        content = <AllUsers></AllUsers>
        break;
      case 1:
        content = <BannedUsers></BannedUsers>
        break;
      case 2:
        content = <SetRole></SetRole>
        break;
      default:
        
    }
  
    return (
      <div className="contain">
          <div className="d-flex justify-content-between"> 
              <Col sm="2" className="btn-container">
                <div className="div">                
                    <Button  className="custom-btn" onClick={()=> (setTarget(0), getUsers())}>All users</Button>              
                </div>
                <div className="div">
                  <Button className="custom-btn" onClick={()=> (setTarget(1))}>Banned users</Button>
                </div>
                <div className="div">
                    <Button className="custom-btn" onClick={()=> (setTarget(2), getUsers())}>Set role</Button>
                </div>
              </Col>
              <Col sm="10" className="profile-info">
               {content}
              </Col>
          </div>  
      </div>
    );
  });

export default Admin