import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayments } from "../../../Redux/customer_model/Payments/paymentActions";
import { useParams, useNavigate } from "react-router-dom";

const PaymentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { payments, loading, error } = useSelector((state) => state.payments);
  const {user} = useSelector((state) => state.auth);
  const customerId = user?.user?.userName

  useEffect(() => {
    if (customerId) {
      dispatch(fetchPayments(customerId));
    }
  },[customerId, dispatch]);

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

  if (!payments || payments.length === 0)
    return (
      <div className="container mx-auto mt-5 text-center text-xl text-gray-700">
        No payments available
      </div>
    );

  return (
    <div className="container mx-auto m-5 px-4">
      <h2 className="text-[#343a40] text-3xl font-semibold mb-6 text-center">
        My Payments
      </h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#00acc1]">
              <th className="py-3 px-6 border border-gray-200 text-white text-lg">
                Payment ID
              </th>
              <th className="py-3 px-6 border border-gray-200 text-white text-lg">
                Amount
              </th>
              <th className="py-3 px-6 border border-gray-200 text-white text-lg">
                Subscribed To
              </th>
              <th className="py-3 px-6 border border-gray-200 text-white text-lg">
                Payment Date
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={index}
                className="group transition duration-300 odd:bg-[#f2f2f2] even:bg-white hover:bg-[#438e9c]"
                // onClick={() => handleClick(customerId, payment.payId)}
              >
                <td className="py-3 px-6 border-t border-gray-200 text-blue-600 group-hover:bg-black group-hover:text-white">
                  {payment.payId}
                </td>
                <td className="py-3 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white">
                  {payment.amount}
                </td>
                <td className="py-3 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white">
                  {payment.department}
                </td>
                <td className="py-3 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white">
                  {new Date(payment.paymentDate).toLocaleDateString("en-GB")}
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

export default PaymentList;
