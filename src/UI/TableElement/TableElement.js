import NextSvg from "../../assets/svgs/NextSvg";
import PrevSvg from "../../assets/svgs/PrevSvg";
import { usePagination, DOTS } from "../../hooks/usePagination";

import "./TableElement.css";

export const TableElement = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  type,
  customStyle,
  color,
  textColor,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
  });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange?.length - 1];

  let element = null;

  if (type === "pagination") {
    element = (
      <div style={customStyle}>
        <div className="pagination">
          <div className="pagination-inner">
            <div
              className={`prev ${currentPage === 1 && "disabled"}`}
              onClick={onPrevious}
            >
              <PrevSvg />
            </div>
            {paginationRange.map((pageNumber, index) => {
              if (pageNumber === DOTS) {
                return <div key={index}>...</div>;
              }

              return (
                <div
                  key={index}
                  className={`${pageNumber === currentPage ? "active-element" : ""}`}
                  onClick={() => onPageChange(pageNumber)}
                  style={{
                    backgroundColor: `${
                      color && pageNumber === currentPage
                        ? color
                        : !color && pageNumber === currentPage
                          ? "rgba(100, 95, 95, 0.571)"
                          : ""
                    }`,
                  }}
                >
                  {pageNumber}
                </div>
              );
            })}
            <div
              className={`next ${currentPage === lastPage && "disabled"}`}
              onClick={onNext}
            >
              <NextSvg />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return element;
};
