import _ from "lodash";
import { usePagination } from "@hooks";
import { TeacherContext } from "@context";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

const Pagination = () => {
  const { teachers } = TeacherContext.useContext();

  const {
    currentPage,
    pagesLimit,
    firstIndex,
    lastIndex,
    pageNumbers,
    changeCurrentPage,
    changeToNextPage,
    changeToPreviusPage,
  } = usePagination({ data: teachers });

  return (
    <div className="flex flex-col w-screen h-screen bg-blue-100">
      <div className="grid grid-cols-6 px-12 pt-12 gap-2 mb-12 flex-1">
        {_.map(teachers.slice(firstIndex, lastIndex), (teacher) => (
          <div key={teacher?._id} className="bg-white text-gray-900 p-2 rounded">
            {teacher?.name}
          </div>
        ))}
      </div>
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing
              {" "}
              <span className="font-medium">{pagesLimit}</span>
              {" "}
              to
              {" "}
              <span className="font-medium">{lastIndex - firstIndex}</span>
              {" "}
              of
              {" "}
              <span className="font-medium">{teachers?.length}</span>
              {" "}
              results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                type="button"
                onClick={changeToPreviusPage}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {_.map(pageNumbers, (page) => (
                <button
                  key={`pagination-${page}`}
                  type="button"
                  aria-current={page === currentPage ? "page" : "false"}
                  onClick={() => changeCurrentPage(page)}
                  className={`z-10 ${
                    page === currentPage
                      ? "bg-indigo-50 border-indigo-500 text-indigo-600"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                  } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}

                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={changeToNextPage}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
