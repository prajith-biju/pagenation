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
  const [currentNum, setCurrentNum] = useState(currentPage);

  const resetCurrent = () => {
    pages?.map((item: pagesType) => {
      item.current = false;
      item.isActive = false;
    });
  };

  const setActivePages = (pageArray: pagesType[]) => {
    pageArray.map((item: pagesType) => {
      item.isActive = true;
      if (item.num === currentNum) {
        item.current = true;
      }
    });
  };

  const renderPagenation = () => {
    resetCurrent();
    let tempCurrent: pagesType[] = [];
    const star = currentNum - 3;
    const end = currentNum + 2;
    if (pages) {
      const activePages = pages.slice(star, end);
      const statPages = pages.slice(0, 2);
      const endPages = pages.slice(-2);
      setActivePages(activePages);
      setActivePages(statPages);
      setActivePages(endPages);
      tempCurrent = [...statPages, ...activePages, ...endPages];
      console.log(tempCurrent);
    }
    setCurrentPages(tempCurrent);
  };

  useEffect(() => {
    const temp: pagesType[] = [];
    temp.length = total / count;

    for (let i = 0; i < temp.length; i++) {
      temp[i] = { id: i, num: i + 1, isActive: false, current: false };
    }

    setPages(temp);
  }, []);

  useEffect(() => {
    renderPagenation();
  }, [currentNum]);

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
          <span
            key={item.id}
            className="flex items-center"
            onClick={() => setCurrentNum(item.num)}
          >
            <PageNumber
              num={item.num}
              isActive={item.isActive}
              current={item.current}
            />
          </span>
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
