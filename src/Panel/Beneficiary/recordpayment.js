import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const RecordPayment = () => {
  const [amount, setAmount] = useState(0);
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisloading(true);
    await axiosInstance
      .post("admin/record-payment", {
        user_id: formData.userData.id,
        requested_amount: formData.userData.amount,
        paid_amount: amount,
      })
      .then((res) => {
        console.log(res);
        setisloading(false);
        alert("Record payment submitted");
        navigate("/panel/reports");
      })
      .catch((e) => {
        console.log(e);
        setisloading(false);
      });

    // Add logic to handle form submission
  };

  const location = useLocation();
  const formData = location.state;
  console.log(formData);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-[350px]">
        <h2 className="text-xl font-Polysans font-semibold text-center text-gray-700 mb-8">
          Record Payment
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="amount"
              className="text-sm font-medium text-[#0d0c22] mb-2 font-Polysans "
            >
              Amount Requested
            </label>
            <input
              value={formData.userData.amount}
              type="number"
              id="amount"
              name="amount"
              min="0"
              placeholder="Enter amount"
              readOnly
              className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none "
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="amount"
              className="text-sm font-medium text-[#0d0c22] mb-2 font-Polysans "
            >
              Amount
            </label>
            <input
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              type="number"
              id="amount"
              name="amount"
              min="0"
              placeholder="Enter amount"
              required
              className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none "
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#0d0c22]  text-white px-4 py-2 rounded-md font-bold font-Polysans transition duration-200"
          >
            Record Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecordPayment;
