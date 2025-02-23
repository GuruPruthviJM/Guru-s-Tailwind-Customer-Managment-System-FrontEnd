import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, logout } from "../../Redux/signUp/logIn/logInActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dropdown = ({ selectedRole, setSelectedRole }) => {
  const roles = ["Customers", "Employees", "Managers", "Admins", "Authorizers"];
  return (
    <div className="mb-6">
      <label className="block text-lg font-bold text-gray-700 mb-1">
        Select a role:
      </label>
      <select
        className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        required
      >
        <option value="" disabled>
          -- Select Role --
        </option>
        {roles.map((role, index) => (
          <option key={index} value={role}>
            {role}
          </option>
        ))}
      </select>
      {selectedRole && (
        <p className="mt-2 text-sm text-gray-500">
          Selected Role: <span className="font-medium">{selectedRole}</span>
        </p>
      )}
    </div>
  );
};

const LoginForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const existingSession = sessionStorage.getItem("user");

  // Show toast error when error state changes
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-right" });
    }
  }, [error]);

  // Show toast success on login and then navigate
  useEffect(() => {
    if (user) {
      toast.success("Login Successful", { position: "top-right" });
      navigate(`/${selectedRole.toLowerCase()}`);
    } else {
      navigate("/login");
    }
  }, [user, navigate, selectedRole]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (existingSession) {
      alert("Please logout from the previous session.");
      sessionStorage.removeItem("user");
      return;
    }
    dispatch(loginUser(username, password, selectedRole));
  };

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
        style={{ backgroundImage: "url('/login02.jpg')" }}
      >
        <div className="relative max-w-md w-full transform transition duration-500 hover:scale-105 m-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 shadow-2xl">
            <h3 className="text-center text-2xl font-bold text-gray-800 mb-6">
              Welcome Back!
            </h3>

            {existingSession ? (
              <div className="text-center">
                <p className="text-red-500 mb-4">
                  You are already logged in. Please logout first.
                </p>
                <button
                  className="w-full bg-yellow-500 text-white py-3 rounded-md mt-4 hover:bg-yellow-600 transition duration-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label
                    htmlFor="username"
                    className="block text-lg font-bold text-gray-700 mb-1"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className="block text-lg font-bold text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <Dropdown
                  selectedRole={selectedRole}
                  setSelectedRole={setSelectedRole}
                />

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                <div className="text-center mt-6">
                  <a
                    href="#"
                    className="text-indigo-600 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/reset");
                    }}
                  >
                    Forgot Password?
                  </a>
                  <span className="mx-3 text-gray-400">|</span>
                  <a
                    href="#"
                    className="text-indigo-600 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/signup");
                    }}
                  >
                    Sign Up
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
};

export default LoginForm;
