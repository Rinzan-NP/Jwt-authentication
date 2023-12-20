import React, { useState } from "react";
import Modal from "react-modal";

const AddUserModal = ({ isOpen, onRequestClose, onAddUser }) => {
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddUser = () => {
    onAddUser(newUser);
    setNewUser({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Add User</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={newUser.first_name}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={newUser.last_name}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
        </div>
        <button type="button" onClick={handleAddUser} className="bg-indigo-500 text-white p-2 rounded-md">
          Add User
        </button>
      </form>
    </Modal>
  );
};

export default AddUserModal;
