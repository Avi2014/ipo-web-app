import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const validateForm = (formData) => {
  const errors = {};
  if (!formData.firstName || formData.firstName.length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }
  if (!formData.lastName || formData.lastName.length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }
  if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = "Valid email is required";
  }
  if (
    !formData.password ||
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(formData.password)
  ) {
    errors.password =
      "Password must be at least 6 characters, include uppercase, lowercase, and a number";
  }
  if (!formData.phone || !/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
    errors.phone = "Valid phone number is required";
  }
  if (!formData.dateOfBirth || isNaN(Date.parse(formData.dateOfBirth))) {
    errors.dateOfBirth = "Valid date of birth is required";
  } else {
    const age =
      new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear();
    if (age < 18) errors.dateOfBirth = "Must be at least 18 years old";
  }
  if (
    !formData.panNumber ||
    !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)
  ) {
    errors.panNumber = "Valid PAN number is required";
  }
  if (!formData.address.street) errors.street = "Street address is required";
  if (!formData.address.city) errors.city = "City is required";
  if (!formData.address.state) errors.state = "State is required";
  if (!formData.address.pincode || !/^\d{6}$/.test(formData.address.pincode)) {
    errors.pincode = "Valid 6-digit pincode is required";
  }
  if (!formData.bankDetails.accountNumber)
    errors.accountNumber = "Account number is required";
  if (
    !formData.bankDetails.ifscCode ||
    !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.bankDetails.ifscCode)
  ) {
    errors.ifscCode = "Valid IFSC code is required";
  }
  if (!formData.bankDetails.bankName) errors.bankName = "Bank name is required";
  return errors;
};

const UserSignup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    panNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    },
    bankDetails: {
      accountNumber: "",
      ifscCode: "",
      bankName: "",
    },
    rememberDevice: false,
  });
  // Removed unused showPassword state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else if (name.startsWith("bankDetails.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        bankDetails: { ...prev.bankDetails, [key]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const errors = validateForm(formData);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setIsLoading(false);
      setError("Please fix the errors above.");
      return;
    }
    try {
      await register(formData);
      navigate("/user-dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className="w-1/2 px-3 py-2 rounded bg-gray-800 text-white"
              required
            />
            {fieldErrors.firstName && (
              <div className="text-red-400 text-xs">
                {fieldErrors.firstName}
              </div>
            )}
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="w-1/2 px-3 py-2 rounded bg-gray-800 text-white"
              required
            />
            {fieldErrors.lastName && (
              <div className="text-red-400 text-xs">{fieldErrors.lastName}</div>
            )}
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          />
          {fieldErrors.email && (
            <div className="text-red-400 text-xs">{fieldErrors.email}</div>
          )}
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          />
          {fieldErrors.phone && (
            <div className="text-red-400 text-xs">{fieldErrors.phone}</div>
          )}
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            placeholder="Date of Birth"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          />
          {fieldErrors.dateOfBirth && (
            <div className="text-red-400 text-xs">
              {fieldErrors.dateOfBirth}
            </div>
          )}
          <input
            type="text"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleInputChange}
            placeholder="PAN Number"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          />
          {fieldErrors.panNumber && (
            <div className="text-red-400 text-xs">{fieldErrors.panNumber}</div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleInputChange}
              placeholder="Street"
              className="w-1/2 px-3 py-2 rounded bg-gray-800 text-white"
              required
            />
            {fieldErrors.street && (
              <div className="text-red-400 text-xs">{fieldErrors.street}</div>
            )}
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleInputChange}
              placeholder="City"
              className="w-1/2 px-3 py-2 rounded bg-gray-800 text-white"
              required
            />
            {fieldErrors.city && (
              <div className="text-red-400 text-xs">{fieldErrors.city}</div>
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              name="address.state"
              value={formData.address.state}
              onChange={handleInputChange}
              placeholder="State"
              className="w-1/2 px-3 py-2 rounded bg-gray-800 text-white"
              required
            />
            {fieldErrors.state && (
              <div className="text-red-400 text-xs">{fieldErrors.state}</div>
            )}
            <input
              type="text"
              name="address.pincode"
              value={formData.address.pincode}
              onChange={handleInputChange}
              placeholder="Pincode"
              className="w-1/2 px-3 py-2 rounded bg-gray-800 text-white"
              required
            />
            {fieldErrors.pincode && (
              <div className="text-red-400 text-xs">{fieldErrors.pincode}</div>
            )}
          </div>
          <input
            type="text"
            name="bankDetails.accountNumber"
            value={formData.bankDetails.accountNumber}
            onChange={handleInputChange}
            placeholder="Account Number"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          />
          {fieldErrors.accountNumber && (
            <div className="text-red-400 text-xs">
              {fieldErrors.accountNumber}
            </div>
          )}
          <input
            type="text"
            name="bankDetails.ifscCode"
            value={formData.bankDetails.ifscCode}
            onChange={handleInputChange}
            placeholder="IFSC Code"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          />
          {fieldErrors.ifscCode && (
            <div className="text-red-400 text-xs">{fieldErrors.ifscCode}</div>
          )}
          <input
            type="text"
            name="bankDetails.bankName"
            value={formData.bankDetails.bankName}
            onChange={handleInputChange}
            placeholder="Bank Name"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          />
          {fieldErrors.bankName && (
            <div className="text-red-400 text-xs">{fieldErrors.bankName}</div>
          )}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="rememberDevice"
              checked={formData.rememberDevice}
              onChange={handleInputChange}
            />
            <span className="text-gray-300">Remember this device</span>
          </div>
          {error && (
            <div className="text-red-400 bg-red-900/20 p-2 rounded">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-400">Already have an account? </span>
          <Link to="/user-signin" className="text-cyan-400 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
