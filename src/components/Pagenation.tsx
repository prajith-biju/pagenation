import { useEffect, useState } from "react";
import { pagenationProps } from "../types";
import { pagesType } from "../types";

export const Pagenation: React.FC<pagenationProps> = ({
  count,
  total,
  currentPage,
}) => {
  const [pages, setPages] = useState<pagesType[]>();

  const renderPages = () => {
    console.log(count, total, currentPage);
  };

  useEffect(() => {
    const temp: any = [];
    temp.length = total;

    for (let i = 0; i < temp.length; i++) {
      temp[i] = { id: 1, num: i + 1, isActive: false, current: false };
    }

    setPages(temp);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="left-btns p-[20px]">
        <button className="p-[8px]">
          <i className="fas fa-angle-double-left"></i>
        </button>
        <button className="p-[8px]">
          <i className="fas fa-angle-left"></i>
        </button>
      </div>

      <div className="right-btns p-[20px]">
        <button className="p-[8px]">
          <i className="fas fa-angle-right"></i>
        </button>
        <button className="p-[8px]">
          <i className="fas fa-angle-double-right"></i>
        </button>
      </div>
    </div>
  );
};
