import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployeeDetails } from "../../../Redux/manager_module/details/detailsActions";
import { logout } from "../../../Redux/signUp/logIn/logInActions"; // Adjust path as needed
import { useNavigate, useParams } from "react-router-dom";

const ManagerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { employeeDetails, loading, error } = useSelector(
    (state) => state.managerDetails
  );
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();

  // Fetch manager details when the component mounts
  useEffect(() => {
    if (id) {
      // If the URL has an id param, fetch that manager's details
      dispatch(fetchEmployeeDetails(id));
    } else if (user?.user?.userName) {
      // Otherwise, fetch the logged-in user's details
      dispatch(fetchEmployeeDetails(user.user.userName));
    }
  }, [dispatch, user, id]);

  let phoneKey = ""

  if(id){
    phoneKey="phoneNo"
  }else{
    phoneKey="phone_Number"
  }

  // Define the fields to display and their labels
  const fieldsToDisplay = [
    { key: "name", label: "Employee Name" },
    { key: "managerId", label: "Employee UserName" },
    { key: "email", label: "Email" },
    { key: phoneKey, label: "Phone Number" },
    { key: "avgResolutionTime", label: "Avg Resolution Time" },
    { key: "avgResponseTime", label: "Avg Response Time" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleEdit = () => {
    navigate("/managers/edits");
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="container mx-auto mt-5 px-4">
      <h2 className="text-3xl font-semibold mb-6 underline text-left text-gray-800">
        Employee Details
      </h2>

      {employeeDetails && (
        <div className="overflow-x-auto shadow-lg rounded-lg mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#00acc1]">
                <th className="py-4 px-6 border border-gray-200 text-white text-lg text-center">
                  Field
                </th>
                <th className="py-4 px-6 border border-gray-200 text-white text-lg text-center">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {fieldsToDisplay.map(({ key, label }, index) => (
                <tr
                  key={index}
                  className="cursor-pointer transition text-center duration-300 hover:bg-[#438e9c] group odd:bg-[#f2f2f2] even:bg-white"
                >
                  <td className="py-3 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white text-center">
                    {label}
                  </td>
                  <td className="py-3 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white text-center">
                    {employeeDetails[key] || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Button container - only show if no id param in the URL */}
      {!id && (
        <div className="flex justify-between items-center gap-4 mt-8">
          <button
            onClick={handleEdit}
            className="w-1/6 py-2 px-4 mb-5 bg-green-700 text-white rounded transition duration-300 hover:bg-green-800 text-sm font-bold"
          >
            Edit
          </button>
          <button
            onClick={handleLogout}
            className="w-1/6 py-2 px-4 mb-5 bg-red-600 text-white rounded transition duration-300 hover:bg-red-700 text-sm font-bold"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ManagerList;
