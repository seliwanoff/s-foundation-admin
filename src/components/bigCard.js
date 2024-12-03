import BarChart from "./BarChart";
import YearSelection from "./yeareelction";

const BigCard = ({ title, value, data, setselectedYear }) => {
  return (
    <div className="flex-grow basis-[340px] max-w-[340px] xl:max-w-[50%]  bg-white shadow-md  p-4 rounded-md  flex box-border">
      <div className="flex flex-col gap-4 h-full justify-between w-full">
        <div className="flex justify-between items-center w-full ">
          <h3 className="font-Polysans text-[#0d0c22] font-semibold">
            {title}
          </h3>
          <YearSelection setselectedYear={setselectedYear} />
        </div>

        <BarChart title="Beneficiaries" data={data} />
      </div>
    </div>
  );
};

export default BigCard;
