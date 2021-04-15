import React, { useEffect } from "react";
import "../styles/pagination.css";
const Pagination = ({ totalPages, handleClick }) => {
  useEffect(() => {
    const c = document.querySelector(".containers");
    const indexs = Array.from(document.querySelectorAll(".index"));
    let cur = -1;
    indexs.forEach((index, i) => {
      index.addEventListener("click", (e) => {
        // clear
        c.className = "containers";
        void c.offsetWidth; // Reflow
        c.classList.add("open");
        c.classList.add(`i${i + 1}`);
        if (cur > i) {
          c.classList.add("flip");
        }
        cur = i;
      });
    });
  });

  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div className="containers">
        <span>
          {pages.map((num) => (
            <div
              className="index"
              key={num}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                handleClick(num);
              }}
            >
            <b>{num}</b>  
            </div>
          ))}
        </span>
        <svg className='svgPagination' viewBox="0 0 100 100">
          <path className="pathPagination" d="m 7.1428558,49.999998 c -1e-7,-23.669348 19.1877962,-42.8571447 42.8571442,-42.8571446 23.669347,0 42.857144,19.1877966 42.857144,42.8571446" />
        </svg>
        <svg className='svgPagination' viewBox="0 0 100 100">
          <path className="pathPagination" d="m 7.1428558,49.999998 c -1e-7,23.669347 19.1877962,42.857144 42.8571442,42.857144 23.669347,0 42.857144,-19.187797 42.857144,-42.857144" />
        </svg>
      </div>
    </div>
  );
};
export default Pagination;
