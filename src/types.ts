export type pagenationProps = {
  count: number;
  total: number;
  currentPage: number;
};

export type pagesType = {
  id?: number;
  num: number;
  isActive: boolean;
  current: boolean;
};
