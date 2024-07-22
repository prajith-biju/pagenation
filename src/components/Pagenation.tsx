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

  const clickPage = (page: pagesType) => {
    if (page.isActive) {
      setCurrentNum(page.num);
    }
  };

  const toFirstPage = () => {
    if (currentNum > 1) {
      setCurrentNum(1);
    }
  };
  const toLastPage = () => {
    if (pages && currentNum < pages.length) {
      setCurrentNum(pages.length);
    }
  };
  const toPreviusPage = () => {
    if (currentNum > 1) {
      setCurrentNum((prev) => prev - 1);
    }
  };
  const toNextPage = () => {
    if (pages && currentNum < pages.length) {
      setCurrentNum((prev) => prev + 1);
    }
  };

  const createUniquePages = (activePages: pagesType[]) => {
    let leftDummy: pagesType[] = [];
    let rightDummy: pagesType[] = [];
    leftDummy.length = rightDummy.length = 3;
    leftDummy.fill({ id: -1, num: -1, isActive: false, current: false });
    rightDummy.fill({ id: -1, num: -1, isActive: false, current: false });

    if (pages) {
      leftDummy = leftDummy.map((item: pagesType, idx) => ({
        ...item,
        id: idx * idx + -5,
      }));
      rightDummy = rightDummy.map((item: pagesType, idx) => ({
        ...item,
        id: (idx + 5) * pages.length,
      }));
      const startPages = pages.slice(0, 2);
      const endPages = pages.slice(-2);
      setActivePages(activePages);
      setActivePages(startPages);
      setActivePages(endPages);

      if (
        activePages.every((elem: pagesType) => {
          return elem.num >= 4;
        }) &&
        activePages.every((elem: pagesType) => {
          return elem.num <= pages.length - 3;
        })
      ) {
        const set = new Set([
          ...startPages,
          ...leftDummy,
          ...activePages,
          ...rightDummy,
          ...endPages,
        ]);
        return [...set];
      } else if (
        activePages.every((elem: pagesType) => {
          return elem.num >= 4;
        })
      ) {
        const set = new Set([
          ...startPages,
          ...leftDummy,
          ...activePages,
          ...endPages,
        ]);
        return [...set];
      } else if (
        activePages.every((elem: pagesType) => {
          return elem.num <= pages.length - 3;
        })
      ) {
        const set = new Set([
          ...startPages,
          ...activePages,
          ...rightDummy,
          ...endPages,
        ]);
        return [...set];
      }
    }
  };

  const renderPagenation = () => {
    resetCurrent();
    let tempCurrent: pagesType[] | undefined = [];
    let activePages: pagesType[] = [];
    if (pages) {
      const n = pages.length;

      if (
        currentNum !== 2 &&
        currentNum !== 1 &&
        currentNum !== n &&
        currentNum !== n - 1
      ) {
        const star = currentNum - 3;
        const end = currentNum + 2;
        activePages = pages.slice(star, end);
        tempCurrent = createUniquePages(activePages);
        setCurrentPages(tempCurrent);
        return;
      } else if (currentNum === 1) {
        activePages = pages.slice(0, 3);
        tempCurrent = createUniquePages(activePages);
        setCurrentPages(tempCurrent);
        return;
      } else if (currentNum === 2) {
        activePages = pages.slice(0, 4);
        tempCurrent = createUniquePages(activePages);
        setCurrentPages(tempCurrent);
        return;
      } else if (currentNum === n) {
        activePages = pages.slice(n - 3, n + 1);
        tempCurrent = createUniquePages(activePages);
        setCurrentPages(tempCurrent);
        return;
      } else if (currentNum === n - 1) {
        activePages = pages.slice(n - 4, n + 1);
        tempCurrent = createUniquePages(activePages);
        setCurrentPages(tempCurrent);
        return;
      }
    }
  };

  useEffect(() => {
    const temp: pagesType[] = [];
    temp.length = total / count;

    for (let i = 0; i < temp.length; i++) {
      temp[i] = { id: i, num: i + 1, isActive: false, current: false };
    }

    setPages(temp);
    renderPagenation();
  }, []);

  useEffect(() => {
    renderPagenation()
  },[pages])

  useEffect(() => {
    renderPagenation();
  }, [currentNum]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="left-btns p-[20px]">
        <button className="p-[16px] scale-[1.5] active:scale-[1.2]" onClick={toFirstPage}>
          <i className="fas fa-angle-double-left"></i>
        </button>
        <button className="p-[16px] scale-[1.5] active:scale-[1.2]" onClick={toPreviusPage}>
          <i className="fas fa-angle-left"></i>
        </button>
      </div>

      <div className="p-[4px] flex">
        {currentPages?.map((item: pagesType) => (
          <span
            key={item.id}
            className="flex items-center"
            onClick={() => clickPage(item)}
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
        <button className="p-[16px] scale-[1.5] active:scale-[1.2]" onClick={toNextPage}>
          <i className="fas fa-angle-right"></i>
        </button>
        <button className="p-[16px] scale-[1.5] active:scale-[1.2]" onClick={toLastPage}>
          <i className="fas fa-angle-double-right"></i>
        </button>
      </div>
    </div>
  );
};
