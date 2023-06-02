import { Link } from "@remix-run/react";
import { useState } from "react";
import type { V2_MetaFunction } from "@remix-run/node";

import "tailwindcss/tailwind.css";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Signup() {
  const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
  });

  function handleChange(e: { target: { name: any; value: any; }; }) {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value,
      });
  }

  async function handleSubmit(e: { preventDefault: () => void; }) {
      e.preventDefault();
      const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "accept": "application/json",
          },
          body: JSON.stringify(formData),
      });
      if (res.ok) {
          window.location.href = "/dashboard";
      }

  }

  return (
    <div className="min-h-screen bg-slate-700 flex items-center justify-center flex-col">
      <header className="text-6xl font-bold text-white fixed top-0">TaskMaster</header>
      <form className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3" onSubmit={handleSubmit}>
        <h1 className="text-2xl mb-6 text-center">Signup</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm mb-2">
            First Name
          </label>
          <input
            type="text"
            id="first-name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg">
          Signup
        </button>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
