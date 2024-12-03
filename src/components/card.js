const Card = ({ title, value }) => {
  return (
    <div className="flex-grow flex-shrink-0 basis-[245px] bg-white shadow-md  p-4 rounded-md  flex h-[120px]">
      <div className="flex flex-col gap-4 h-full justify-between">
        <div className="font-Polysans text-[#0d0c22] font-semibold">
          {title}
        </div>

        <span className="font-normal text-[16px] text-[#121212] font-Polysans">
          {value}
        </span>
      </div>
    </div>
  );
};

export default Card;
