import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, Col } from "react-bootstrap";
import "./Profile.css";
import Test from "./test";
import TableEditor from "../components/TableEditor";

const Graph = observer(() => {
  const profileButtonRef = useRef(null);
  const userinfo = JSON.parse(localStorage.user)

  const [target, setTarget] = useState(0);


  useEffect(() => {
    profileButtonRef.current.focus();
  }, []);


  let content;
  switch (target) {
    case 0:

      break;
    case 1:
      content = <TableEditor></TableEditor>
      break;
    case 2:
      content = <Test></Test>
      break;

    case 3:
      
      break;
    default:
      content = <div>Select an option</div>;
  }

  return (
    <div className="contain">
        <div className="d-flex justify-content-between"> 
            <Col sm="2" className="btn-container">
              <div className="div">
                <Button ref={profileButtonRef} className="custom-btn" onClick={()=> setTarget(0)}>Build graph</Button>
              </div>
              <div className="div">
                <Button className="custom-btn" onClick={()=> setTarget(1)}>Table</Button>
              </div>
              <div className="div">
                <Button className="custom-btn" onClick={()=> setTarget(2)}>Upload file</Button>
              </div>
              <div className="div">
                <Button className="custom-btn" onClick={()=> setTarget(3)}>View all inform</Button>
              </div>
            </Col>
            <Col sm="10" className="profile-info">
              {content}
            </Col>
        </div>  
    </div>
  );
});

export default Graph;