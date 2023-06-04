import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";
import { useLocation } from "@remix-run/react";

// Define a type for the form data
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  inviteId: string | null;
};

export default function EmailSign() {
    const [orgName, setOrgName] = useState("");
    const [formData, setFormData] = useState<FormData>({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      inviteId: null,
    });
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const inviteID = query.get("invite_id");

        fetch(`/api/invite/${inviteID}`)
            .then((res) => res.json())
            .then((data) => {
                if (data && data.organizationName) {
                    setOrgName(data.organizationName);
                    setFormData((prevState) => ({...prevState, inviteId: inviteID }));
                }
            })
            .catch((err) => console.error(err));
    }, [location]);

    function handleChange(e: { target: { name: any; value: any; }; }) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        const res = await fetch("/api/auth/signupWithInvite", {
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
                <h1 className="text-2xl mb-6 text-center">You have been invited to join {orgName}. Please complete your signup to join.</h1>
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
