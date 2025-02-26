import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollegues } from "../../../Redux/manager_module/collegue/collegueActions";
import { useNavigate } from "react-router-dom";

const ManagerColleagues = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { collegues, loading, error } = useSelector((state) => state.collegue);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.user?.userName) {
      dispatch(fetchCollegues(user.user.userName));
    }
  }, [dispatch, user]);

  // When a row is clicked, navigate to the manager profile page
  const handleClick = (value) => {
    navigate(`/managers/profile/${value}`);
  };

  if (loading)
    return (
      <p className="text-center mt-5 text-xl">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-center mt-5 text-red-600 text-xl">
        {error}
      </p>
    );
  if (!collegues?.length)
    return (
      <p className="text-center mt-5 text-xl text-gray-700">
        No managers found.
      </p>
    );

  // Update headers: use "managerId" instead of "employeeId"
  const headers = ["employeeId", "name", "designation", "email", "avgResolutionTime", "avgResponseTime"];

  return (
    <div className="mx-20 container mt-5 px-4 mb-20">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 underline">
        My Collegues
      </h2>
      <div className="w-[90%] overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#00acc1]">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="py-4 px-6 border border-gray-200 text-white text-lg"
                >
                  {header.charAt(0).toUpperCase() + header.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {collegues
              .sort((a, b) => (a.type === "manager" ? -1 : 1))
              .map((collegue, index) => (
                <tr
                  key={index}
                  className={`cursor-pointer transition duration-300 group ${
                    collegue.type === "manager"
                      ? "bg-green-500 font-bold"
                      : "odd:bg-[#f2f2f2] even:bg-white hover:bg-[#438e9c]"
                  }`}
                  onClick={() => handleClick(collegue[headers[0]])}
                >
                  {headers.map((header, idx) => (
                    <td
                      key={idx}
                      className="py-3 px-6 border-t border-gray-200 text-center group-hover:bg-black group-hover:text-white"
                    >
                      {collegue[header] || "N/A"}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerColleagues;
