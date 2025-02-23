import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPayment } from "../../../Redux/customer_model/Payments/paymentActions";
import { useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const [customerId, setCustomerId] = useState("");
  const [paymentType, setPaymentType] = useState("GPay");
  const [purchaseItem, setPurchaseItem] = useState("Customer-Experience-Transformation");
  const [amount, setAmount] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [prevLoading, setPrevLoading] = useState(false);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.payments);
  const { user } = useSelector((state) => state.auth);
  // Removed direct setCustomerId here to avoid side-effects

//   const { id: urlCustomerId } = useParams();
  const urlCustomerId = user?.user?.userName;
  
  const itemPrices = {
    "Customer-Experience-Transformation": 500,
    "Data-and-AI": 700,
    "Product-and-Platform-Engineering": 1000,
    "Global-Design-Studio": 1200,
    "Digital-Transformation-Consulting": 1500,
    "Infrastructure-Cloud-and-Security": 1800,
  };

  // Auto-fill customerId from user data whenever it updates
  useEffect(() => {
    setCustomerId(user?.user?.userName || "");
  }, [user]);

  // Update amount when purchase item changes
  useEffect(() => {
    setAmount(itemPrices[purchaseItem] || "");
  }, [purchaseItem]);

  // Track payment success & show toast notifications
  useEffect(() => {
    if (prevLoading && !loading && !error) {
      toast.success("Payment Successful!", { position: "top-right" });
      // Reset form on success
      setCustomerId(user?.user?.userName || "");
      setPaymentType("GPay");
      setPurchaseItem("Customer-Experience-Transformation");
      setAgreeTerms(false);
    }
    if (error) {
        toast.error(error, { position: "top-right" });
    }
    setPrevLoading(loading);
  }, [loading, error, user, prevLoading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!agreeTerms) {
      toast.warn("You must agree to the terms and conditions!", { position: "top-right" });
      return;
    }
    if (customerId !== user?.user?.userName) {
      toast.error("Customer ID does not match!", { position: "top-right" });
      return;
    }
    const paymentData = { customerId, paymentType, department: purchaseItem, amount };
    dispatch(createPayment(urlCustomerId, paymentData));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f5dc] px-4">
      <div className="max-w-md w-full m-8 transform transition duration-500 hover:scale-105">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-center text-2xl font-bold mb-6 text-[#00acc1]">
            Payment Form
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Customer ID */}
            <div className="mb-4">
              <label className="block mb-1 text-base">Customer ID:</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded bg-white"
                value={customerId}
                readOnly
                required
              />
            </div>
            {/* Payment Type */}
            <div className="mb-4">
              <label className="block mb-1 text-base">Payment Type:</label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                required
              >
                <option value="GPay">GPay</option>
                <option value="PhonePe">PhonePe</option>
                <option value="Paytm">Paytm</option>
              </select>
            </div>
            {/* Purchase Item */}
            <div className="mb-4">
              <label className="block mb-1 text-base">Purchase Item:</label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={purchaseItem}
                onChange={(e) => setPurchaseItem(e.target.value)}
                required
              >
                {Object.keys(itemPrices).map((item) => (
                  <option key={item} value={item}>
                    {item.replace(/-/g, " ")}
                  </option>
                ))}
              </select>
            </div>
            {/* Amount */}
            <div className="mb-4">
              <label className="block mb-1 text-base">Amount (in Rs):</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                value={amount}
                readOnly
                required
              />
            </div>
            {/* Terms and Conditions */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
              <label htmlFor="terms" className="text-base">
                I agree to the terms and conditions
              </label>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-bold transition duration-200 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Payment;
