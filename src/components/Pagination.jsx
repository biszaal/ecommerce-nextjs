import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const Pagination = ({
  totalProducts,
  productsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pageCount = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (page) => {
    console.log("Changing to page:", page);
    if (page >= 1 && page <= pageCount) {
      setCurrentPage(page);
    }
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center mt-4">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
          >
            <ChevronLeftIcon />
          </a>
        </li>
        {[...Array(pageCount)].map((_, i) => (
          <li
            key={i}
            className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
          >
            <a
              className="page-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i + 1);
              }}
            >
              {i + 1}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === pageCount ? "disabled" : ""}`}
        >
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
          >
            <ChevronRightIcon />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
