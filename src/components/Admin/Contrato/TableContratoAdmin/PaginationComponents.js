import React, { useEffect, useState } from "react";
import "./PaginationComponents.css";

export function PaginationComponent(props) {
  const { data, itemsPerPage } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const [currentItems, setCurrentItems] = useState([]);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(data.slice(indexOfFirstItem, indexOfLastItem));
  }, [data, currentPage, itemsPerPage]);

  const pages = Math.ceil(data.length / itemsPerPage);
  console.log("pages");

  const renderPageNumbers = [];
  for (let number = 1; number <= pages; number++) {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      const isActive = currentPage === number;
      renderPageNumbers.push(
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={isActive ? "active" : null}
        >
          {number}
        </li>
      );
    }
  }

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > pages) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setCurrentPage(currentPage - pageNumberLimit);
      setMinPageNumberLimit(Math.max(minPageNumberLimit - pageNumberLimit, 0));
    }
  };

  let pageIncrementBtn = null;
  if (pages > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  return (
    <>
      <ul>
        {currentItems.map((todo, index) => (
          <li key={index}>{todo.title}</li>
        ))}
      </ul>
      <ul className="pageNumbers">
        <li>
          <button onClick={handlePrevbtn} disabled={currentPage === 1}>
            previous
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <li>
          <button onClick={handleNextbtn} disabled={currentPage === pages}>
            next
          </button>
        </li>
      </ul>
    </>
  );
}

export default PaginationComponent;
