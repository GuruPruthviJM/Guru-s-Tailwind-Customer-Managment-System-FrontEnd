import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployeeDetails } from "../../../Redux/employee_module/details/detailsActions";
import { logout } from "../../../Redux/signUp/logIn/logInActions"; // Adjust path as needed
import { useNavigate, useParams } from "react-router-dom";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { employeeDetails, loading, error } = useSelector(
    (state) => state.employeeDetails
  );
  const { user } = useSelector((state) => state.auth);

  let {id} = useParams()

  // Fetch customer details when the component mounts
  useEffect(() => {
    if(id){
      dispatch(fetchEmployeeDetails(id));
    }else if (user?.user?.userName) {
      dispatch(fetchEmployeeDetails(user.user.userName));
    }
  }, [dispatch, user]);

  // Define the fields to display and their labels
  const fieldsToDisplay = [
    { key: "name", label: "Employee Name" },
    { key: "employeeId", label: "Employee UserName" },
    { key: "email", label: "Email" },
    { key: "phoneNo", label: "Phone Number" },
    { key: "avgResolutionTime", label: "Avg Resolution Time" },
    { key: "avgResponseTime", label: "Avg Responce Time"}
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };



  const handleEdit = () => {
    navigate("/employees/edits");
  };

  return (
    <div className="container mx-auto mt-5 px-4">
      <h2 className="text-3xl font-semibold mb-6 underline text-left text-gray-800">
        Employee Details
      </h2>

      {/* Display loading or error messages */}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {employeeDetails && (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#00acc1]">
                <th className="py-4 px-6 border border-gray-200 text-white text-lg">
                  Field
                </th>
                <th className="py-4 px-6 border border-gray-200 text-white text-lg">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {fieldsToDisplay.map(({ key, label }, index) => (
                <tr
                  key={index}
                  className="cursor-pointer transition duration-300 hover:bg-[#438e9c] group odd:bg-[#f2f2f2] even:bg-white"
                >
                  <td className="py-3 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white">
                    {label}
                  </td>
                  <td className="py-3 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white">
                    {employeeDetails[key] || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Button container */}
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
    </div>
  );
};

export default EmployeeList;
