import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Sample data for FAQs
const faqs = [
  { 
    question: "How do I register as a customer in a service portal?", 
    answer: (
      <ul>
        <li><strong>Access the Portal</strong>: Navigate to the service portal's login page.</li>
        <li><strong>Initiate Registration</strong>: Click on the "Create an Account" or "Register" option.</li>
        <li><strong>Provide Information</strong>: Enter your personal details, such as name, email address, and contact information.</li>
        <li><strong>Set Credentials</strong>: Create a username and a secure password.</li>
        <li><strong>Verify Email</strong>: Check your inbox for a verification email and click the provided link to activate your account.</li>
        <li><strong>Complete Profile</strong>: Log in to your new account and complete any additional profile information as required.</li>
      </ul>
    )
  },
  { 
    question: "What should I do if I forget my customer portal password?", 
    answer: (
      <ul>
        <li><strong>Go to Login Page</strong>: Navigate to the service portal's login page.</li>
        <li><strong>Click on 'Forgot Password'</strong>: Select the "Forgot Password" link.</li>
        <li><strong>Enter Email</strong>: Provide your registered email address.</li>
        <li><strong>Check Email</strong>: Look for a password reset email in your inbox.</li>
        <li><strong>Reset Password</strong>: Follow the instructions in the email to reset your password.</li>
      </ul>
    )
  },
  { 
    question: "How can I update my contact information in the customer portal?", 
    answer: (
      <ul>
        <li><strong>Log In</strong>: Access your account by logging into the service portal.</li>
        <li><strong>Navigate to Profile Settings</strong>: Go to the profile or account settings section.</li>
        <li><strong>Update Information</strong>: Edit your contact details such as phone number, email address, etc.</li>
        <li><strong>Save Changes</strong>: Ensure you save the changes before exiting.</li>
      </ul>
    )
  },
  { 
    question: "How do I submit a support ticket through the customer portal?", 
    answer: (
      <ul>
        <li><strong>Log In</strong>: Access your account by logging into the service portal.</li>
        <li><strong>Go to Support Section</strong>: Navigate to the support or help section.</li>
        <li><strong>Create New Ticket</strong>: Click on the option to create a new support ticket.</li>
        <li><strong>Provide Details</strong>: Fill in the required details about your issue or request.</li>
        <li><strong>Submit Ticket</strong>: Submit the ticket and note any reference number provided.</li>
      </ul>
    )
  },
  { 
    question: "How can I track the status of my support ticket?", 
    answer: (
      <ul>
        <li><strong>Log In</strong>: Access your account by logging into the service portal.</li>
        <li><strong>Go to Support Section</strong>: Navigate to the support or help section.</li>
        <li><strong>View Tickets</strong>: Look for an option to view or track your support tickets.</li>
        <li><strong>Check Status</strong>: Find your ticket and check its current status or any updates.</li>
      </ul>
    )
  }
];

// Single FAQ item
function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-3">
      <button
        className="w-full text-left text-blue-600 font-medium hover:underline focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {faq.question}
      </button>
      {isOpen && <div className="mt-2 text-gray-600">{faq.answer}</div>}
    </div>
  );
}

export default function FAQs() {
  const navigate = useNavigate();

  const handleRaiseTicket = () => {
    navigate("/customers/raiseTicket");
  };

  return (
    <div className="bg-[#f5f5dc] py-10 px-4">
      {/* Heading and Raise Ticket above the container */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">FAQs</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
          onClick={handleRaiseTicket}
        >
          Raise Ticket
        </button>
      </div>

      {/* White container for FAQ items */}
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} />
        ))}
      </div>
    </div>
  );
}
