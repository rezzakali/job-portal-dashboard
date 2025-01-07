import { Typography } from '@material-tailwind/react';

import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
  handleLimit: (limit: number) => void;
  page: number;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  handleLimit,
  page,
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  // previous button handler
  const handlePrev = () => {
    if (page > 1) {
      const newPage = page - 1;
      onPageChange(newPage);
    }
  };

  // next button handler
  const handleNext = () => {
    if (page < pageCount) {
      const newPage = page + 1;
      onPageChange(newPage);
    }
  };

  const renderPageNumbers = () => {
    const maxPagesToShow = 8;
    const pageNumbers = [];
    const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(pageCount, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
      pageNumbers.push(
        <li key={1}>
          <button
            onClick={() => handleClick(1)}
            className="px-2 py-0 border rounded hover:bg-primaryColor focus:outline-none"
          >
            1
          </button>
        </li>
      );

      if (startPage > 2) {
        pageNumbers.push(<li key={'start_ellipsis'}>...</li>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i}>
          <button
            onClick={() => handleClick(i)}
            className={`${
              page === i ? 'bg-black text-white hover:bg-black' : ''
            } px-2 py-0 border rounded hover:bg-primaryColor focus:outline-none`}
          >
            {i}
          </button>
        </li>
      );
    }

    if (endPage < pageCount) {
      if (endPage < pageCount - 1) {
        pageNumbers.push(<li key={'end_ellipsis'}>...</li>);
      }

      pageNumbers.push(
        <li key={pageCount}>
          <button
            onClick={() => handleClick(pageCount)}
            className="px-2 py-0 border rounded hover:bg-primaryColor focus:outline-none"
          >
            {pageCount}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-between my-4 bg-white p-2 mx-auto rounded-full space-x-3">
      <div></div>
      <nav>
        <ul className="flex items-center gap-2 justify-center">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-2 py-0 border rounded hover:bg-primaryColor focus:outline-none disabled:cursor-not-allowed"
          >
            <MdKeyboardArrowLeft className="w-5 h-5" />
          </button>

          {renderPageNumbers()}

          <button
            onClick={handleNext}
            disabled={page === pageCount}
            className="px-2 py-0 border rounded hover:bg-primaryColor focus:outline-none disabled:cursor-not-allowed"
          >
            <MdKeyboardArrowRight className="w-5 h-5" />
          </button>
        </ul>
      </nav>

      <div className="flex items-center space-x-1">
        <Typography variant="small">limit per page</Typography>
        <select
          name="limit"
          id="limit"
          className="border p-1 rounded focus:outline-primaryTeal [&_*]:p-1"
          value={itemsPerPage}
          onChange={(e) => handleLimit(Number(e.target.value))}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default PaginationComponent;
