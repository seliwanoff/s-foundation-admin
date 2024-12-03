import { useEffect, useState } from "react";
import BigCard from "../components/bigCard";
import Card from "../components/card";
import axiosInstance from "../api/axiosInstance";

const DashboardWrapper = () => {
  const [beneficiaryData, setBeneficiaryData] = useState([]);
  const [selectedYear, setselectedYear] = useState("");
  const [payments, setPaymentData] = useState([]);
  const [stat, setStat] = useState([]);
  useEffect(() => {
    const fetcStat = async () => {
      await axiosInstance
        .get("/admin/dashboard-stats")
        .then((res) => {
          setStat(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetcStat();
  }, []);
  useEffect(() => {
    const fetchUserCount = async () => {
      await axiosInstance
        .get(`/admin/users-by-month/${selectedYear}`)
        .then((res) => {
          setBeneficiaryData(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchUserCount();
  }, [selectedYear]);

  useEffect(() => {
    const fetchRecordCount = async () => {
      await axiosInstance
        .get(`/admin/monthly-payment-counts${selectedYear}`)
        .then((res) => {
          setPaymentData(res.data.volumeData);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchRecordCount();
  }, [selectedYear]);

  return (
    <div className="flex flex-col gap-6 mt-2 p-8">
      <div className="flex flex-nowrap overflow-x-auto gap-4 parent-scroll">
        <Card title={"Total Disbursed"} value={stat.total_amount_paid} />
        <Card title={"Total Beneficiaries"} value={stat.total_users} />
        <Card
          title={"Total Record Payment"}
          value={stat.total_record_payments}
        />
      </div>

      <div className="flex flex-wrap justify-start items-start gap-4">
        <BigCard
          title={"Record Payment Insight"}
          value={"200000"}
          data={payments}
          setselectedYear={setselectedYear}
        />
        <BigCard
          title={"Beneficiary Insight"}
          value={"200000"}
          data={beneficiaryData}
          setselectedYear={setselectedYear}
        />
      </div>
    </div>
  );
};

export default DashboardWrapper;
