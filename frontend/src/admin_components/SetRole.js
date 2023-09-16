import React, { useState } from 'react';
import { setRoleById } from '../http/adminAPI';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import "./Admin.css";

const SetRole = () => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const allUsers = JSON.parse(localStorage.users || "[]");

    const userOptions = allUsers.map(user => ({
        value: user.id,
        label: user.email,
    }));

    const roleOptions = [
        { value: "USER", label: "USER" },
        { value: "ADMIN", label: "ADMIN" },
    ];

    const handleUserChange = (option) => {
        setSelectedUserId(option ? option.value : null);
    };

    const handleRoleChange = (option) => {
        setSelectedRole(option ? option.value : null);
    };

    const handleSubmit = async () => {
        if (selectedUserId && selectedRole) {
            try {
                await setRoleById(selectedUserId, selectedRole);
                alert("Role updated successfully");
            } catch (error) {
                console.error("Failed to set role", error);
            }
        } else {
            alert("Please select a user and a role");
        }
    };

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: '#559c64f6',
            '&:hover': { borderColor: '#559c64f6' }, 
            boxShadow: state.isFocused ? '0 0 5px #173a1ef6' : null,
            outline: 'none',
            margin: '10px 0 10px 32px',
        }),
        option: (provided) => ({
            ...provided,
            color: 'black'
        }),
        menu: (provided) => ({
            ...provided,
            marginLeft: '32px',
            width: '755px'
        })
    };

    return (
        <div>
            <div className='profile-h'>
                <h2>Set Role for User</h2>
            </div>
            
            <div className='profile-ul'>
                <Select
                    classNamePrefix="react-select"
                    placeholder="Select User by Email..."
                    options={userOptions}
                    onChange={handleUserChange}
                    isSearchable={true}
                    styles={customStyles}
                />

                <Select
                    classNamePrefix="react-select"
                    placeholder="Select Role"
                    options={roleOptions}
                    onChange={handleRoleChange}
                    styles={customStyles}
                /> 
            </div>  
            <Button className='changePassword-btn' onClick={handleSubmit}>Set Role</Button>
        </div>
    );
};

export default SetRole;