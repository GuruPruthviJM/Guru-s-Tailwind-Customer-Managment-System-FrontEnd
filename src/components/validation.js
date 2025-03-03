export const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return { isValid: false, message: "Please enter a valid email address" };
    }
    return { isValid: true };
  };
  
  export const validatePassword = (password) => {
    // Password must be at least 8 characters long and include:
    // one uppercase letter, one lowercase letter, one number, and one special character.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return {
        isValid: false,
        message:
          "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.",
      };
    }
    return { isValid: true };
  };
  
  export const validateRole = (selectedRole) => {
    if (!selectedRole) {
      return { isValid: false, message: "Please select a role" };
    }
    return { isValid: true };
  };
  
  export const validateOtp = (otp) => {
    // Check if OTP is provided
    if (!otp || !otp.trim()) {
      return { isValid: false, message: "Please enter the OTP" };
    }
    // Assuming OTP should be a 6-digit numeric code.
    const otpRegex = /^\d{6}$/;
    if (!otpRegex.test(otp)) {
      return { isValid: false, message: "OTP must be a 6-digit number" };
    }
    return { isValid: true };
  };
  
  export const validateFullName = (fullName) => {
    if (!fullName || fullName.trim().length < 2) {
      return { isValid: false, message: "Please enter a valid full name." };
    }
    // Only allow letters and spaces (no special characters)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(fullName)) {
      return { isValid: false, message: "Full name should not contain special characters." };
    }
    return { isValid: true };
  };
  
  export const validateUserName = (userName) => {
    if (!userName || userName.trim().length < 2) {
      return { isValid: false, message: "Please enter a valid user name." };
    }
    if (userName.length > 16) {
      return { isValid: false, message: "User name should not exceed 16 characters." };
    }
    return { isValid: true };
  };
  
  export const validatePhoneNumber = (phoneNumber) => {
    // Assuming a 10-digit phone number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return { isValid: false, message: "Please enter a valid 10-digit phone number." };
    }
    return { isValid: true };
  };
  
  export const validatePincode = (pincode) => {
    // Assuming a 6-digit pincode
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(pincode)) {
      return { isValid: false, message: "Please enter a valid 6-digit pincode." };
    }
    return { isValid: true };
  };
  