import React from "react";
import { useState } from "react";

const Reviews = ({ onReview }) => {
  const [ratting, setRatting] = useState(0);
  return (
    <div className="" id="reviews">
      <h4>Reviews</h4>

      <div className="review-bx">
        <div className="all-review">
          <h2 className="rating-type">3</h2>
          <ul className="cours-star">
            {[1, 2, 3, 4, 5].map((x) => {
              return (
                <li
                  className={x <= ratting && "active"}
                  key={x}
                  onClick={() => setRatting(x)}
                >
                  <i className="fa fa-star"></i>
                </li>
              );
            })}
          </ul>
          <span>3 Rating</span>
        </div>
        <div className="review-bar">
          <div className="bar-bx">
            <div className="side">
              <div>5 star</div>
            </div>
            <div className="middle">
              <div className="bar-container">
                <div className="bar-5" style={{ width: "90%" }}></div>
              </div>
            </div>
            <div className="side right">
              <div>150</div>
            </div>
          </div>
          <div className="bar-bx">
            <div className="side">
              <div>4 star</div>
            </div>
            <div className="middle">
              <div className="bar-container">
                <div className="bar-5" style={{ width: "70%" }}></div>
              </div>
            </div>
            <div className="side right">
              <div>140</div>
            </div>
          </div>
          <div className="bar-bx">
            <div className="side">
              <div>3 star</div>
            </div>
            <div className="middle">
              <div className="bar-container">
                <div className="bar-5" style={{ width: "50%" }}></div>
              </div>
            </div>
            <div className="side right">
              <div>120</div>
            </div>
          </div>
          <div className="bar-bx">
            <div className="side">
              <div>2 star</div>
            </div>
            <div className="middle">
              <div className="bar-container">
                <div className="bar-5" style={{ width: "40%" }}></div>
              </div>
            </div>
            <div className="side right">
              <div>110</div>
            </div>
          </div>
          <div className="bar-bx">
            <div className="side">
              <div>1 star</div>
            </div>
            <div className="middle">
              <div className="bar-container">
                <div className="bar-5" style={{ width: "20%" }}></div>
              </div>
            </div>
            <div className="side right">
              <div>80</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
