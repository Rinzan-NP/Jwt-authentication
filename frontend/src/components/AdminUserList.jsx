import React, { useState } from "react";
import { PencilAltIcon } from "@heroicons/react/solid";

const users = [
  { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
  { id: 2, firstName: "Jane", lastName: "Doe", email: "jane.doe@example.com" },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
  },
];

const UserList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleAddUser = () => {
    console.log("New User:", newUser);
    setNewUser({ firstName: "", lastName: "", email: "" });
    setShowAddUserForm(false);
  };

  return (
    <div className="container mx-auto my-10 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
        User Listing
      </h2>

      <div className="flex items-center mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users..."
          className="flex-1 p-3 border rounded-md focus:outline-none focus:ring focus:border-purple-300"
        />
        <button
          onClick={() => setShowAddUserForm(!showAddUserForm)}
          className="ml-4 p-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-400 focus:ring focus:border-purple-300"
        >
          {showAddUserForm ? "Cancel" : "Add User"}
        </button>
      </div>

      {showAddUserForm && <div className="mb-6">{/* Add User Form */}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white p-6 rounded-md shadow-md flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-700">{`${user.firstName} ${user.lastName}`}</h3>
              <button className="rounded-full p-2 pl-3 bg-indigo-500 text-white w-10 h-10">
                <PencilAltIcon className="h-5 w-5" />
              </button>
            </div>
            <p className="text-purple-900">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
