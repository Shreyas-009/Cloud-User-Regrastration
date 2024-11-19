import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/usl";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${api}/dashboard`);
        setUsers(response.data.users);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-zinc-900 text-white">
        Loading Users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-zinc-900 text-white">
        <p className="text-red-500">{error}</p>
        <Link to="/" className="mt-4 text-blue-400 hover:underline">
          Back to Register
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard - Registered Users</h1>

      {users.length === 0 ? (
        <p className="text-gray-400">No users registered yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-zinc-800 p-6 rounded-lg shadow-lg hover:bg-zinc-700 transition-colors"
            >
              <h2 className="text-2xl text-purple-300 font-semibold mb-4">
                {user.username}
              </h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium text-purple-300">Email:</span>{" "}
                  {user.email}
                </p>
                <p>
                  <span className="font-medium text-purple-300">Phone:</span>{" "}
                  {user.phoneNumber}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link
        to="/"
        className="mt-6 inline-block text-purple-400 hover:text-purple-600"
      >
        Back to Register
      </Link>
    </div>
  );
};

export default Dashboard;
