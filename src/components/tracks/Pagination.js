import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ perPage, totalList, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalList / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="nav justify-content-center">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li className="page-item" key={number}>
            <div
              role="button"
              onClick={() => paginate(number)}
              className="page-link"
            >
              {number}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
