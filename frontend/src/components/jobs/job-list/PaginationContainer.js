import React, { useContext }from 'react'

import { JobContext } from '../../../helpers/JobContext'

import ReactPaginate from "react-paginate";

const PaginationContainer = (props) => {
  const { handlePageClick } = props;
  const { pageCount, showingJobDetails, itemOffset, currentPage } = useContext(JobContext);
  return (
    <div className="pagination-bg">
      {!showingJobDetails && pageCount > 1 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=" > "
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          previousLabel=" < "
          renderOnZeroPageCount={null}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={pageCount === 1 ? "none" : "page-item-prev"}
          previousLinkClassName={
            itemOffset === 0 ? "disabled" : "page-link-prev"
          }
          nextClassName={pageCount === 1 ? "none" : "page-item-next"}
          nextLinkClassName={
            currentPage === pageCount ? "disabled" : "page-link-prev"
          }
          activeClassName={"active"}
          forcePage={currentPage - 1}
        />
      )}
    </div>
  );
}

export default PaginationContainer