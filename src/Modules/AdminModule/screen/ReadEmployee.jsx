import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../../Redux/admin_model/CRUD/readEmployeeAction";
import { useNavigate } from "react-router-dom";

const EmployeeListAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employees, loading, error } = useSelector((state) => state.employees);
  const { user } = useSelector((state) => state.auth);

  // Optionally, if the fetch needs a parameter based on the current user, you can use something like:
  // const employeeId = user?.user?.userName;
  // useEffect(() => {
  //   if (employeeId) {
  //     dispatch(fetchEmployees(employeeId));
  //   }
  // }, [employeeId, dispatch]);

  // For a general employee list:
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // Redirect to login if error indicates login is required
  useEffect(() => {
    if (error && error.includes("Please LogIn")) {
      navigate("/login");
    }
  }, [error, navigate]);

  if (loading)
    return (
      <div className="container mx-auto mt-5 text-center text-xl">
        Loading...
      </div>
    );

  if (!employees || employees.length === 0)
    return (
      <div className="container mx-auto mt-5 text-center text-xl text-gray-700">
        No employees available
      </div>
    );

  return (
    <div className="container mx-auto m-5 px-4">
      <h2 className="text-[#343a40] text-3xl font-semibold mb-6 text-center">
        Employee List
      </h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#00acc1]">
              <th className="py-3 px-6 border border-gray-200 text-white text-lg">
                Employee ID
              </th>
              <th className="py-3 px-6 border border-gray-200 text-white text-lg">
                Name
              </th>
              <th className="py-3 px-6 border border-gray-200 text-white text-lg">
                Email
              </th>
              <th className="py-3 px-6 border border-gray-200 text-white text-lg">
                Phone Number
              </th>
              <th className="py-3 px-6 border border-gray-200 text-white text-lg">
                Department
              </th>
              <th className="py-3 px-6 border border-gray-200 text-white text-lg">
                Designation
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr
                key={index}
                className="group transition duration-300 odd:bg-[#f2f2f2] even:bg-white hover:bg-[#438e9c]"
              >
                <td className="py-3 px-6 border-t border-gray-200 text-blue-600 group-hover:bg-black group-hover:text-white">
                  {employee.employeeId}
                </td>
                <td className="py-3 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white">
                  {employee.name}
                </td>
                <td className="py-3 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white">
                  {employee.email}
                </td>
                <td className="py-3 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white">
                  {employee.phoneNo}
                </td>
                <td className="py-3 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white">
                  {employee.department}
                </td>
                <td className="py-3 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white">
                  {employee.designation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && !error.includes("Please LogIn") && (
        <div className="mt-5 text-center text-red-600 text-xl">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default EmployeeListAdmin;
