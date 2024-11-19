import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../utils/usl";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const phoneNumber = e.target[2].value;

    try {
      const res = await axios.post(`${api}/register`, {
        username,
        email,
        phoneNumber,
      });

      // Show success message and navigate to dashboard
      alert(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      // Display error message from backend
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="w-full h-full bg-zinc-900 flex justify-center items-center">
      <div className="flex flex-col text-center gap-7 bg-zinc-800 p-7 rounded-xl w-1/3">
        <h1 className="text-4xl text-white">Register</h1>
        <hr />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="p-4 text-black outline-none border-none rounded-full"
            type="text"
            name="username"
            placeholder="Username"
            required
          />
          <input
            className="p-4 text-black outline-none border-none rounded-full"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="p-4 text-black outline-none border-none rounded-full"
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            required
          />
          <input
            className="p-4 bg-purple-400 hover:bg-purple-600 font-semibold rounded-full text-white text-xl"
            type="submit"
            value="Register"
          />
        </form>
        <div>
          <span className="text-xl text-white">
            See all Registerations {" "}
            <Link
              className="font-semibold text-purple-400 hover:text-purple-700"
              to="/dashboard"
            >
              Go to Dashboard
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
