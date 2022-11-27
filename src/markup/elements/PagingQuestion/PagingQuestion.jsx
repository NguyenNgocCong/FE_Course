import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import "./paging-question.css";

const PagingQuestion = ({
  totalPage,
  currentPage,
  onChange,
  totalItem,
  pageIndex,
  ...props
}) => {
  // eslint-disable-next-line
  const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    setSelectedPage(currentPage);
  }, [currentPage]);

  return (
    <div className="d-flex w-100 justify-content-end">
      <>
        {[...Array(totalPage)].map((item, key) => {
          const index = key + 1;
          return (
            <li
              key={key}
              className={`paging-question-item ${pageIndex === index ? "paging-question-current-selectes" : ""
                }`}
              {...props}
            >
              <div
                onClick={() => {
                  setSelectedPage(index);
                  onChange(index);
                }}
                className="paging-question-detail"
              >
                {index}
              </div>
            </li>
          );
        })}
      </>
    </div>
  );
};

PagingQuestion.propTypes = {
  totalPage: PropTypes.number,
  currentPage: PropTypes.number,
  totalItem: PropTypes.number,
  onChange: PropTypes.func,
};

PagingQuestion.defaultProps = {
  totalPage: 50,
  currentPage: 1,
  totalItem: 3,
  onChange: () => { },
};

export default PagingQuestion;
