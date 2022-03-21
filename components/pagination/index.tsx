/* eslint-disable react/require-default-props */
import _ from "lodash";
import { Children } from "react";
import { usePagination } from "@hooks";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

interface IPaginationProps {
    totalCount: number;
    siblingCount?: number;
    pageSize: number;
    currentPage: number;
    changeCurrentPage: (page: number) => void;
}

const Pagination = ({
  totalCount, siblingCount = 0, pageSize, currentPage, changeCurrentPage,
}: IPaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => changeCurrentPage(currentPage + 1);
  const onPrev = () => changeCurrentPage(currentPage - 1);

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <nav className="flex justify-center align-center mt-6 rounded-md -space-x-px gap-2" aria-label="Pagination">
      {currentPage !== 1 && (
        <button
          type="button"
          onClick={onPrev}
          className="relative inline-flex items-center px-2 py-2 rounded-l-md bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 hover:bg-default-color hover:text-gray-100"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      )}

      {Children.toArray(_.map(paginationRange, (pageNumber) => {
        if (pageNumber === "...") {
          return <div className="px-4 py-2 bg-white dark:bg-gray-800 dark:text-gray-50">...</div>;
        }

        return (
          <button
            type="button"
            aria-current={pageNumber === currentPage ? "page" : "false"}
            onClick={() => changeCurrentPage(typeof pageNumber === "string" ? 0 : pageNumber)}
            className={`z-10 sm:flex ${
              pageNumber === currentPage
                ? "bg-default-color border-default-color rounded text-gray-100"
                : "bg-white dark:bg-gray-800 text-gray-500 hover:bg-default-color hover:text-gray-100"
            } relative inline-flex items-center px-4 py-2 text-sm font-medium`}
          >
            {pageNumber}
          </button>
        );
      }))}

      {currentPage !== lastPage && (
        <button
          type="button"
          onClick={onNext}
          className="relative inline-flex items-center px-2 py-2 rounded-r-md bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 hover:bg-default-color hover:text-gray-100"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </nav>
  );
};

export default Pagination;
