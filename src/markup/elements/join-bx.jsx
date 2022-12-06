import React, { Component } from "react";
import { Link } from "react-router-dom";
import Count from "./counter/counter-sensor";

class JoinBx extends Component {
  render() {
    return (
      <>
        <div
          className="section-area bg-fix ovbl-dark join-bx"
        >
          <div className="container">
            <div className="row join-content-bx text-white">
              <div className="col-md-9">
                <h3>Popular online courses</h3>
              </div>
              <div className="col-md-2">
                <h4>
                  <Count counter={198} />+ Courses
                </h4>
              </div>
              <div className="col-md-1 text-right">
                <Link to="/products" className="btn btn-warning button-md">
                  See Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default JoinBx;
