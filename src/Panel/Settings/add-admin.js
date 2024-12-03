import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const RegisterAdminPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    address: "",
    password_confirmation: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/admin/register", formData);
      alert("Admin registered successfully!");
      navigate("/panel/settings");
    } catch (err) {
      console.error("Error registering admin:", err);
      setError("Failed to register admin. Please check the input data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 flex flex-col items-center bg-white m-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-6 font-Polysans">
        Register Admin
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        {/* First Name */}
        <div className="mb-4">
          <label
            htmlFor="first_name"
            className="block text-sm font-medium mb-2 font-Inter"
          >
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md outline-none"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label
            htmlFor="last_name"
            className="block text-sm font-medium mb-2 font-Inter"
          >
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md outline-none"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium mb-2 font-Inter"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md outline-none"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2 font-Inter"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md outline-none"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md outline-none"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md outline-none"
            required
          />
        </div>
        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Address
          </label>
          <textarea
            type="password"
            id="password"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md outline-none"
            required
          ></textarea>
        </div>
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-[#0d0c22] text-white px-4 py-2 rounded-md font-bold disabled:bg-blue-300 font-Polysans"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register Admin"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterAdminPage;
