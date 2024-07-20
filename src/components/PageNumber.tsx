import { pagesType } from "../types";

export const PageNumber: React.FC<pagesType> = ({ num, isActive, current }) => {
  return (
    <div
      className={`${isActive ? "p-[10px]" : "w-[0px]"} ${
        current ? "bg-[#222]" : "bg-[#fff]"
      } text-black`}
    >
      {num}
    </div>
  );
};
