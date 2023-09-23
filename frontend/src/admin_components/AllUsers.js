import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Admin.css";
import { getAllUsers, banUserById, unbanUserById } from "../http/adminAPI";
import ConfirmationModal from '../components/ConfirmationModal';

const AllUsers = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  
  const getUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response && response.data) {
        const allUsers = response.data.sort((a, b) => a.id - b.id);
        setFilteredUsers(filterUsers(allUsers));
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const banUser = async (id) => { 
    try {
      await banUserById(id);
      getUsers(); 
    } catch (error) {
      console.log(error);
    }
  };
  
  const unbanUser = async (id) => { 
    try {
      await unbanUserById(id);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };
  
  const filterUsers = (users) => {
    return users.filter(user =>
      (emailSearchValue ? user.email.includes(emailSearchValue) : true)
    );
  };
  
  const handleSearch = () => {
    setFilteredUsers(filterUsers(sortedUsers));
  };

  const handleShowModal = (action, userId) => {
    setCurrentAction(action);
    setSelectedUserId(userId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setCurrentAction(null);
    setSelectedUserId(null);
    setShowModal(false);
  };

  
  let allUsers = JSON.parse(localStorage.users);

  const sortedUsers = [...allUsers].sort((a, b) => a.id - b.id);
  const [emailSearchValue, setEmailSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(sortedUsers);

  return (
    <div className="scrollable-container">
      <h2 className="profile-h">All Users</h2>
      <div>
        <input 
          type="text" 
          value={emailSearchValue} 
          onChange={(e) => setEmailSearchValue(e.target.value)} 
          placeholder="Search by Email..."
          className="search-input"
        />
        <Button className="search-btn" onClick={handleSearch}>Search</Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.role === "ADMIN" ? <></> : user.isbanned ? 
                  <button className="unban-btn" onClick={() => handleShowModal('unban', user.id)}>Unban</button> :
                  <button className="ban-btn" onClick={() => handleShowModal('ban', user.id)}>Ban</button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmationModal 
        show={showModal}
        handleClose={handleCloseModal}
        confirmAction={() => {
          if (currentAction === 'ban') {
            banUser(selectedUserId);
          } else if (currentAction === 'unban') {
            unbanUser(selectedUserId);
          }
          handleCloseModal();
        }}
        title="Confirmation"
        message={currentAction === 'ban' ? 'Do you really want to ban this user?' : 'Do you really want to unban this user?'}
      />
    </div>
  );
};

export default AllUsers;