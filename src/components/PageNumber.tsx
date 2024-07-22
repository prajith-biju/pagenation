import { pagesType } from "../types";

export const PageNumber: React.FC<pagesType> = ({ num, isActive, current }) => {
  return (
    <div
      className={`${isActive ? "p-[3px]" : "p-[2px]"} ${
        current ? "bg-[#0096FF] text-white rounded-full" : "bg-[#fff]"
      } text-black flex items-center mx-[4px]`}
    >
      {isActive ? (
        <span>{num}</span>
      ) : (
        <span className="block bg-black w-[8px] h-[8px] rounded-full"></span>
      )}
    </div>
  );
};
