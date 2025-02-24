import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPayment } from "../../../Redux/customer_model/Payments/paymentActions";
import { toast, ToastContainer } from "react-toastify";
import { fetchPayments } from "../../../Redux/customer_model/Payments/paymentActions";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const Payment = () => {
  const [customerId, setCustomerId] = useState("");
  const [paymentType, setPaymentType] = useState("GPay");
  const [purchaseItem, setPurchaseItem] = useState("Customer-Experience-Transformation");
  const [amount, setAmount] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [prevLoading, setPrevLoading] = useState(false);
  const navigate =useNavigate()
  const dispatch = useDispatch();
  const { loading, error, payments } = useSelector((state) => state.payments);
  const { user } = useSelector((state) => state.auth);
  
  const urlCustomerId = user?.user?.userName;
  
  
  // Base item prices for each purchase item.
  const itemPrices = {
    "Customer-Experience-Transformation": 500,
    "Data-and-AI": 700,
    "Product-and-Platform-Engineering": 1000,
    "Global-Design-Studio": 1200,
    "Digital-Transformation-Consulting": 1500,
    "Infrastructure-Cloud-and-Security": 1800,
  };

  const paidItems = payments ? payments.map(payment => payment.department) : [];
  const availableItemPrices = Object.fromEntries(
    Object.entries(itemPrices).filter(([key]) => !paidItems.includes(key))
  );

  useEffect(() => {
    dispatch(fetchPayments(customerId));
  },[customerId])


  useEffect(() => {
    setCustomerId(user?.user?.userName || "");
  }, [user]);

  
  useEffect(() => {
    if (!availableItemPrices[purchaseItem] && Object.keys(availableItemPrices).length > 0) {
      setPurchaseItem(Object.keys(availableItemPrices)[0]);
    }
  }, [availableItemPrices, purchaseItem]);

  useEffect(() => {
    setAmount(availableItemPrices[purchaseItem] || "");
  }, [purchaseItem, availableItemPrices]);

  useEffect(() => {
    if (prevLoading && !loading && !error) {
      toast.success("Payment Successful!", { position: "top-right" });
      setTimeout(()=>{
        navigate('/customers');
        setCustomerId(user?.user?.userName || "");
        setPaymentType("GPay");
        setPurchaseItem("Customer-Experience-Transformation");
        setAgreeTerms(false);
      }, 2000)
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
    if (!availableItemPrices[purchaseItem]) {
      toast.error("This item has already been paid for!", { position: "top-right" });
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
            <div className="mb-4">
              <label className="block mb-1 text-base">Purchase Item:</label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={purchaseItem}
                onChange={(e) => setPurchaseItem(e.target.value)}
                required
                disabled={Object.keys(availableItemPrices).length === 0}
              >
                {Object.keys(availableItemPrices).length > 0 ? (
                  Object.keys(availableItemPrices).map((item) => (
                    <option key={item} value={item}>
                      {item.replace(/-/g, " ")}
                    </option>
                  ))
                ) : (
                  <option value="">No items available</option>
                )}
              </select>
            </div>
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
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-bold transition duration-200 hover:bg-blue-700"
              disabled={loading || Object.keys(availableItemPrices).length === 0}
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
