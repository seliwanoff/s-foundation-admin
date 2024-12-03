import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BankDetailsPage = () => {
  const location = useLocation();
  const { formData } = location.state || {};

  const [hasBank, sethasBankAccount] = useState("");
  //console.log(formData);

  const [bankData, setBankData] = useState({
    bank_name: "",
    bank_account_number: "",
    account_name: "",
  });
  const naviagate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankData({ ...bankData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    naviagate("/panel/capturing", { state: { ...formData, ...bankData } });
  };

  return (
    <div className="p-8 bg-white m-4 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Bank Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="font-Polysans">Do you have Bank account?</label>
          <select
            name="hasBvn"
            value={hasBank}
            onChange={(e) => {
              sethasBankAccount(e.target.value);
            }}
            className="border p-2 rounded-md outline-none"
            required
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        {hasBank === "Yes" && (
          <>
            <div className="flex flex-col space-y-2">
              <label className="font-Polysans">Bank Name</label>
              <input
                type="text"
                name="bank_name"
                value={bankData.bank_name}
                onChange={handleChange}
                className="border p-2 rounded-md outline-none"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-Polysans">Account Number</label>
              <input
                type="text"
                name="bank_account_number"
                value={bankData.bank_account_number}
                onChange={handleChange}
                className="border p-2 rounded-md outline-none"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-Polysans">Account Name</label>
              <input
                type="text"
                name="account_name"
                value={bankData.account_name}
                onChange={handleChange}
                className="border p-2 rounded-md outline-none"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-[#0d0c22] font-Inter font-bold text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BankDetailsPage;
