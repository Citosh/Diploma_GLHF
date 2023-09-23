import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, Col } from "react-bootstrap";
import "./Profile.css";
import Test from "./test";
import TableEditor from "../components/TableEditor";
import UploadTableCSV from "../components/UploadTableCSV";
import AllTables from "../components/AllTables";
import BuildGraph from "../components/BuildGraph";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Graph = observer(() => {
  const profileButtonRef = useRef(null);
  const userinfo = JSON.parse(localStorage.user)

  const [target, setTarget] = useState(0);
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    const savedState = localStorage.getItem('showMenu');
    if (savedState !== null) {
        setShowMenu(JSON.parse(savedState));
    }
}, []);

  useEffect(() => {
      localStorage.setItem('showMenu', JSON.stringify(showMenu));
  }, [showMenu]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  let content;
  switch (target) {
    case 0:
      content = <BuildGraph></BuildGraph>
      break;
    case 1:
      content = <TableEditor></TableEditor>
      break;
    case 2:
      content = <UploadTableCSV></UploadTableCSV>
      break;
    case 3:
      content = <AllTables></AllTables>
      break;
    default:
      content = <div>Select an option</div>;
  }

  return (
    <div className="contain">
        <div className="d-flex justify-content-between">
            {showMenu && (
              <>
                <i 
                  className="bi bi-chevron-double-left show-true icon-toggle" 
                  onClick={toggleMenu}
                ></i>
                <Col sm="2" className="btn-container">
                    <div className="div">
                      <Button ref={profileButtonRef} className="custom-btn" onClick={() => setTarget(0)}>Build graph</Button>
                    </div>
                    <div className="div">
                      <Button className="custom-btn" onClick={() => setTarget(1)}>Table</Button>
                    </div>
                    <div className="div">
                      <Button className="custom-btn" onClick={() => setTarget(2)}>Upload file</Button>
                    </div>
                    <div className="div">
                      <Button className="custom-btn" onClick={() => setTarget(3)}>View all inform</Button>
                    </div>
                </Col>
              </>
            )}
            
            {!showMenu && 
  <i 
  className="bi bi-chevron-double-right icon-toggle"
  onClick={toggleMenu} 
  style={{position: "fixed", zIndex: 2002, left: 0, top: 57}}
></i>}
            
            <Col sm={showMenu ? "10" : "12"} className={`${showMenu ? "profile-info" : ""}`}>
              {content}
            </Col>
        </div>  
    </div>
);
});

export default Graph;