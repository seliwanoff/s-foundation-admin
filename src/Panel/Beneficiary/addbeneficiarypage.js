import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBeneficiaryPage = () => {
  const [formData, setFormData] = useState({
    surname: "",
    firstname: "",
    othername: "",
    sex: "",
    marital_status: "",
    phoneNumber: "",
    localgovernment: "",
    address: "",
    occupation: "",
    shop_address: "",
    purpose: "",
    amount: "",
    hasBvn: "",
    bvn: "",
    hasNin: "",
    nin: "",
    /**
    idType: "",
    idNumber: "",
    */
    is_disabled: "",
    disabilityDescription: "",
    comment: "",
    level_of_education: "",
  });

  const [localgovernments, setlocalgovernments] = useState([
    "Aiyedire",
    "Atakunmosa West",
    "Atakunmosa East",
    "Boluwaduro",
    "Boripe",
    "Ede North",
    "Ede South",
    "Egbedore",
    "Ejigbo",
    "Ife Central",
    "Ife East",
    "Ife North",
    "Ife South",
    "Ilesa East",
    "Ilesa West",
    "Irepodun",
    "Irewole",
    "Isokan",
    "Iwo",
    "Osogbo",
    "dob",
  ]);

  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history("/panel/add-bank-details", { state: { formData } });
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-md outline-none m-4">
      <h2 className="text-xl font-semibold mb-4">Add Beneficiary</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Surname and First Name */}
        <div className="flex xl:space-x-4 xl:flex-nowrap w-full gap-4  flex-wrap">
          <div className="flex flex-col space-y-2 w-full">
            <label className="font-Polysans">Surname</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="border p-2 rounded-md outline-none"
              required
            />
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label className="font-Polysans">First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="border p-2 rounded-md outline-none"
              required
            />
          </div>
        </div>

        {/* Other Name */}
        <div className="flex flex-col space-y-2">
          <label className="font-Polysans">Other Name</label>
          <input
            type="text"
            name="othername"
            value={formData.othername}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none"
          />
        </div>

        {/* Sex */}
        <div className="flex flex-col space-y-2">
          <label className="font-Polysans">Sex</label>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none"
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Marital Status */}
        <div className="flex flex-col space-y-2">
          <label className="font-Polysans">Marital Status</label>
          <select
            name="marital_status"
            value={formData.marital_status}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none"
          >
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

        {/* Phone Number */}
        <div className="flex flex-col space-y-2">
          <label className="font-Polysans">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none"
            required
          />
        </div>

        {/* Local Government */}
        <div className="flex flex-col space-y-2">
          <label className="font-Polysans">Local Government</label>
          <select
            name="localgovernment"
            value={formData.localgovernment}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none"
            required
          >
            <option value="">Select Local Government</option>
            {localgovernments.map((lg, idx) => (
              <option key={idx} value={lg}>
                {lg}
              </option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div className="flex flex-col space-y-2">
          <label className="font-Polysans">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none"
          />
        </div>

        {/* Occupation and Office Address */}
        <div className="flex xl:space-x-4 l:flex-nowrap w-full gap-4  flex-wrap">
          <div className="flex flex-col space-y-2 w-full">
            <label className="font-Polysans">Occupation</label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="border p-2 rounded-md outline-none"
            />
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label className="font-Polysans">Office Address</label>
            <input
              type="text"
              name="shop_address"
              value={formData.shop_address}
              onChange={handleChange}
              className="border p-2 rounded-md outline-none"
            />
          </div>
        </div>

        {/* Purpose */}
        <div className="flex flex-col space-y-2">
          <label className="font-Polysans">Purpose</label>
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none"
            required
          />
        </div>

        {/* Amount */}
        <div className="flex flex-col space-y-2">
          <label className="font-Polysans">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none"
            required
          />
        </div>

        {/* BVN */}
        <div className="flex flex-col space-y-2">
          <label className="font-Polysans">Do you have a BVN?</label>
          <select
            name="hasBvn"
            value={formData.hasBvn}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none"
            required
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        {formData.hasBvn === "Yes" && (
          <div className="flex flex-col space-y-2">
            <label className="font-Polysans">BVN</label>
            <input
              type="text"
              name="bvn"
              value={formData.bvn}
              onChange={handleChange}
              className="border p-2 rounded-md outline-none"
              required
            />
          </div>
        )}

        {/* NIN */}
        <div className="flex flex-col space-y-2">
          <label className="font-Polysans">Do you have a NIN?</label>
          <select
            name="hasNin"
            value={formData.hasNin}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none"
            required
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        {formData.hasNin === "Yes" && (
          <div className="flex flex-col space-y-2">
            <label className="font-Polysans">NIN</label>
            <input
              type="text"
              name="nin"
              value={formData.nin}
              onChange={handleChange}
              className="border p-2 rounded-md outline-none"
              required
            />
          </div>
        )}

        <div className="flex flex-col space-y-2">
          <label className="font-Polysans">D.O.B</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none"
            required
          />
        </div>

        {/*
        <div className="flex space-x-4">
          <div className="flex flex-col space-y-2 w-full">
            <label className="font-Polysans">Identification Type</label>
            <select
              name="idType"
              value={formData.idType}
              onChange={handleChange}
              className="border p-2 rounded-md outline-none"
              required
            >
              <option value="">Select</option>
              <option value="Passport">Passport</option>
              <option value="National ID">National ID</option>
              <option value="Driver's License">Driver's License</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label className="font-Polysans">Identification Number</label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              className="border p-2 rounded-md outline-none"
              required
            />
          </div>
        </div>
        */}

        {/* Disability */}
        <div className="flex flex-col space-y-2">
          <label className="font-Polysans">Are you disabled?</label>
          <select
            name="is_disabled"
            value={formData.is_disabled}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none"
          >
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
        {formData.is_disabled === "1" && (
          <div className="flex flex-col space-y-2">
            <label className="font-Polysans">
              Please describe your disability
            </label>
            <textarea
              name="disabilityDescription"
              value={formData.disabilityDescription}
              onChange={handleChange}
              className="border p-2 rounded-md outline-none"
            />
          </div>
        )}

        {/* Education Level */}
        <div className="flex flex-col space-y-2">
          <label className="font-Polysans">Level of Education</label>
          <select
            name="level_of_education"
            value={formData.level_of_education}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none"
            required
          >
            <option value="">Select</option>
            <option value="Uneducated">Uneducated</option>
            <option value="Primary School">Primary School</option>
            <option value="Secondary School">Secondary School</option>
            <option value="OND">OND</option>
            <option value="HND">HND</option>
            <option value="BSc">BSc</option>
            <option value="MSc">MSc</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        {/* Additional Comments */}
        <div className="flex flex-col space-y-2">
          <label className="font-Polysans">Additional Comments</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#0d0c22] font-Inter font-bold text-white px-4 py-2 rounded-md"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default AddBeneficiaryPage;
