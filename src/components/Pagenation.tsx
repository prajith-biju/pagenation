import { useEffect, useState } from "react";
import { pagenationProps } from "../types";
import { pagesType } from "../types";
import { PageNumber } from "./PageNumber";

export const Pagenation: React.FC<pagenationProps> = ({
  count,
  total,
  currentPage,
}) => {
  const [pages, setPages] = useState<pagesType[]>();
  const [currentPages, setCurrentPages] = useState<pagesType[]>();

  const renderPagenation = () => {
    const star = currentPage - 3;
    const end = currentPage + count - 5;
    let tempCurrent: pagesType[] = [];
    if (pages) {
      tempCurrent = pages.slice(star, end);
      const endElems = pages.slice(-2);
      endElems[0].isActive = endElems[1].isActive = true;
      tempCurrent = tempCurrent.concat(endElems);
      tempCurrent[0].isActive =
        tempCurrent[1].isActive =
        tempCurrent[2].isActive =
        tempCurrent[2].current =
          true;
    }
    setCurrentPages(tempCurrent);
  };

  useEffect(() => {
    const temp: pagesType[] = [];
    temp.length = total;

    for (let i = 0; i < temp.length; i++) {
      temp[i] = { id: i, num: i + 1, isActive: false, current: false };
    }

    setPages(temp);
  }, []);

  useEffect(() => {
    renderPagenation();
  }, [pages]);

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

      <div className="p-[4px] flex">
        {currentPages?.map((item: pagesType) => (
          <PageNumber
            key={item.id}
            num={item.num}
            isActive={item.isActive}
            current={item.current}
          />
        ))}
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
