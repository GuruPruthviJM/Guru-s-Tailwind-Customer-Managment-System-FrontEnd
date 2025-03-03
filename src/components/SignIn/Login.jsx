import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, logout } from "../../Redux/signUp/logIn/logInActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateEmail, validatePassword, validateRole } from "../validation";

const Dropdown = ({ selectedRole, setSelectedRole }) => {
  const roles = ["Customers", "Employees", "Managers", "Admins"];
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
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

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

    // Validate Email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      toast.error(emailValidation.message, { position: "top-right" });
      return;
    }

    // Validate Password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.message, { position: "top-right" });
      return;
    }

    // Validate Role
    const roleValidation = validateRole(selectedRole);
    if (!roleValidation.isValid) {
      toast.error(roleValidation.message, { position: "top-right" });
      return;
    }

    if (existingSession) {
      toast.success("Logged out successfully");
      sessionStorage.removeItem("user");
      return;
    }

    dispatch(loginUser(email, password, selectedRole));
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
                    htmlFor="email"
                    className="block text-lg font-bold text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email"
                    required
                  />
                </div>

                <div className="mb-5 relative">
                  <label
                    htmlFor="password"
                    className="block text-lg font-bold text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 pr-10 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <div
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer my-4"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.27-2.943-9.543-7a9.953 9.953 0 012.432-3.54M6.165 6.165A9.953 9.953 0 0112 5c4.478 0 8.27 2.943 9.543 7a9.953 9.953 0 01-1.41 2.592M3 3l18 18"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </div>
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
