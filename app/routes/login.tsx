import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Function to get a cookie value
function getCookieValue(name: string) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return '';
}


export default function Login() {
  // State to determine if the user was redirected
  const [wasRedirected, setWasRedirected] = useState(false);

  useEffect(() => {
    // Check the session storage for the 'redirected' status
    const redirected = sessionStorage.getItem('redirected') === 'true';
    setWasRedirected(redirected);

    // Reset the status in the session storage
    if (redirected) {
      sessionStorage.setItem('redirected', 'false');
    }
  }, []);

  // State for form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Function to handle form data change
  function handleChange(e: { target: { name: any; value: any } }) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Function to handle form submission
  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      window.location.href = "/dashboard";
    }
  }

  return (
    <div className="min-h-screen bg-slate-700 flex items-center justify-center flex-col ">
      <header className="text-6xl font-bold text-white fixed top-0">TaskMaster</header>

      {/* Show a modal if the user was redirected */}
      {wasRedirected && (
        <div className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
          <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
            <svg
              width="19"
              height="16"
              viewBox="0 0 19 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG Path */}
              <path
                d="M1.50493 16H17.5023C18.6204 16 19.3413 14.9018 18.8354 13.9735L10.8367 0.770573C10.2852 -0.256858 8.70677 -0.256858 8.15528 0.770573L0.156617 13.9735C-0.334072 14.8998 0.386764 16 1.50493 16ZM10.7585 12.9298C10.7585 13.6155 10.2223 14.1433 9.45583 14.1433C8.6894 14.1433 8.15311 13.6155 8.15311 12.9298V12.9015C8.15311 12.2159 8.6894 11.688 9.45583 11.688C10.2223 11.688 10.7585 12.2159 10.7585 12.9015V12.9298ZM8.75236 4.01062H10.2548C10.6674 4.01062 10.9127 4.33826 10.8671 4.75288L10.2071 10.1186C10.1615 10.5049 9.88572 10.7455 9.50142 10.7455C9.11929 10.7455 8.84138 10.5028 8.79579 10.1186L8.13574 4.75288C8.09449 4.33826 8.33984 4.01062 8.75236 4.01062Z"
                fill="#FBBF24"
              ></path>
            </svg>
          </div>
          <div className="w-full">
            <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
              Attention needed
            </h5>
            <p className="leading-relaxed text-[#D0915C]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy
              text ever since the 1500s, when
            </p>
          </div>
        </div>
      )}

      {/* Login form */}
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl mb-6 text-center drop-shadow-lg">Login</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm mb-2">
            Email
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
        <div className="mb-4">
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
        <div className="mb-4">
          <button
            type="submit"
            className="button-primary"
          >
            Login
          </button>
        </div>
        <div className="text-center">
          <Link to="/signup" className="text-blue-500 hover:text-blue-600">
            Don't have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
