import { useCallback, useEffect, useState } from "react";

interface Props {
  dataLength: number;
  limitPerPage: number;
}

const usePagination = ({ dataLength, limitPerPage }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [pagesLimit, setPagesLimit] = useState<number>(limitPerPage);
  const [lastIndex, setLastIndex] = useState<number>(0);
  const [firstIndex, setFirstIndex] = useState<number>(0);

  useEffect(() => {
    setLastIndex(currentPage * pagesLimit);
    setFirstIndex(lastIndex - pagesLimit);
  }, [currentPage, pagesLimit, lastIndex]);

  useEffect(() => {
    const numbers = [];

    for (let index = 1; index <= Math.ceil(dataLength / pagesLimit); index += 1) {
      numbers.push(index);
    }

    setPageNumbers(numbers);
  }, [dataLength, pagesLimit]);

  /**
   * Update the page limits.
   *
   * @param {number} limit
   */
  const updatePagesLimit = useCallback((limit: number) => {
    setPagesLimit(limit);
    setCurrentPage(1);
  }, []);

  /**
   * Change the current page.
   *
   * @param {number} page
   */
  const changeCurrentPage = useCallback(
    (page: number) => {
      if (page < 0 || page > pageNumbers?.length) setCurrentPage(1);
      setCurrentPage(page);
    },
    [pageNumbers?.length],
  );

  /**
   * Change to the next page automatically.
   *
   * @param {number} page
   */
  const changeToNextPage = useCallback(() => {
    if (currentPage < pageNumbers?.length) setCurrentPage((prev) => prev + 1);
  }, [currentPage, pageNumbers?.length]);

  /**
   * Change to the previous page automatically.
   *
   * @param {number} page
   */
  const changeToPreviusPage = useCallback(() => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  }, [currentPage]);

  return {
    currentPage,
    pagesLimit,
    pageNumbers,
    firstIndex,
    lastIndex,
    updatePagesLimit,
    changeCurrentPage,
    changeToNextPage,
    changeToPreviusPage,
  };
};

export default usePagination;
