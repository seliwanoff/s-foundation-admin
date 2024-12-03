import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const UserProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const location = useLocation();
  const formData = location.state;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(
          `/admin/user/${formData.row.id}`
        );

        setUserData(response.data.user);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [formData.row.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data found</div>;
  }

  return (
    <div className="p-8 flex flex-col items-center bg-white m-4 rounded-md">
      <h2 className="text-xl font-semibold mb-10 font-Polysans">
        User Profile
      </h2>

      <div className="flex items-center mb-10">
        <img
          src={userData.image_url} // Replace with the actual profile image URL
          alt="Profile"
          className="xl:w-24 xl:h-24 w-[80px] h-[80px] object-cover rounded-full border-2 border-gray-300"
        />
        <div className="ml-6">
          <h3 className="text-xl font-semibold font-Inter">
            {userData.firstname} {userData.surname}
          </h3>
          <p className="text-sm text-gray-600 font-Inter">
            {userData.occupation}
          </p>
        </div>
      </div>

      <div className="w-full">
        <div className="flex mx-auto max-w-[700px] justify-between mb-4">
          <div className="w-1/2 pr-4">
            <h4 className="font-semibold font-Inter">Personal Information</h4>
            <ul className="text-sm text-gray-700">
              <li>
                <strong className="font-Inter text-[#000]">First Name:</strong>{" "}
                {userData.firstname}
              </li>
              <li>
                <strong className="font-Inter text-[#000]">Surname:</strong>{" "}
                {userData.surname}
              </li>

              <li>
                <strong className="font-Inter text-[#000]">Phone:</strong>{" "}
                {userData.phoneNumber}
              </li>
              <li>
                <strong className="font-Inter text-[#000] ">
                  Marital Status:
                </strong>{" "}
                {userData.marital_status}
              </li>
            </ul>
          </div>
          <div className="w-1/2 pl-4">
            <h4 className="font-semibold">Address Information</h4>
            <ul className="text-sm text-gray-700">
              <li>
                <strong className="font-Inter text-[#000] ">Address:</strong>{" "}
                {userData.address}
              </li>
              <li>
                <strong className="font-Inter text-[#000] ">
                  Local Government:
                </strong>{" "}
                {userData.localgovernment}
              </li>
              <li>
                <strong className="font-Inter text-[#000]">
                  Shop Address:
                </strong>{" "}
                {userData.shop_address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-8 w-full max-w-[700px] mx-auto">
          <h4 className="font-semibold">Bank Information</h4>
          <ul className="text-sm text-gray-700">
            <li>
              <strong className="font-Inter text-[#000]">Bank Name:</strong>{" "}
              {userData.bank_name}
            </li>
            <li>
              <strong className="font-Inter text-[#000]">Account Name:</strong>{" "}
              {userData.account_name}
            </li>
            <li>
              <strong className="font-Inter text-[#000]">
                Account Number:
              </strong>{" "}
              {userData.bank_account_number}
            </li>
          </ul>
        </div>

        <div className="mb-8 w-full max-w-[700px] mx-auto">
          <h4 className="font-semibold">Other Information</h4>
          <ul className="text-sm text-gray-700">
            <li>
              <strong className="font-Inter text-[#000]">Purpose:</strong>{" "}
              {userData.purpose}
            </li>
            <li>
              <strong className="font-Inter text-[#000]">Amount:</strong>{" "}
              {userData.amount}
            </li>
            <li>
              <strong className="font-Inter text-[#000]">BVN:</strong>{" "}
              {userData.bvn}
            </li>
            <li>
              <strong className="font-Inter text-[#000]">NIN:</strong>{" "}
              {userData.nin}
            </li>
            <li>
              <strong className="font-Inter text-[#000]">
                Level of Education:
              </strong>{" "}
              {userData.level_of_education}
            </li>
            <li>
              <strong className="font-Inter text-[#000]">Is Disabled:</strong>{" "}
              {userData.is_disabled ? "Yes" : "No"}
            </li>
            <li>
              <strong className="font-Inter text-[#000]">Comment:</strong>{" "}
              {userData.comment}
            </li>
          </ul>
        </div>

        <div className="mt-8 mx-auto w-full max-w-[700px]">
          <button
            onClick={() => navigate("/panel/record", { state: { userData } })}
            className="bg-[#0d0c22]  text-white px-4 py-2 rounded-md font-bold font-Polysans"
          >
            Record Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
