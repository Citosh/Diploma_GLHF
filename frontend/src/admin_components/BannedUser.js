import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./Admin.css";
import { getAllUsers, unbanUserById } from "../http/adminAPI";
import ConfirmationModal from '../components/ConfirmationModal';

const BannedUsers = () => {
  const [bannedUsers, setBannedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const getUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response && response.data) {
        const filteredBannedUsers = response.data.filter(user => user.isbanned);
        setBannedUsers(filteredBannedUsers);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const unbanUser = async (id) => {
    try {
      await unbanUserById(id);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  const handleUnbanClick = (id) => {
      setSelectedUserId(id);
      setShowModal(true);
  };

  const handleModalClose = () => {
      setShowModal(false);
      setSelectedUserId(null);
  };

  const confirmUnban = async () => {
      if (selectedUserId) {
          await unbanUser(selectedUserId);
      }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
      <div className="scrollable-container">
        <h2 className="profile-h">Banned Users</h2>
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
            {bannedUsers.map(user => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                        {user.role === "ADMIN" ? "GOD" :
                            <Button className="unban-btn" onClick={() => handleUnbanClick(user.id)}>Unban</Button>
                        }
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
        <ConfirmationModal 
            show={showModal} 
            handleClose={handleModalClose} 
            confirmAction={confirmUnban}
        />
      </div>
  );
};

export default BannedUsers;