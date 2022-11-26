import React, { Component } from "react";
import { Link } from "react-router-dom";

// Images
import bg1 from "../../images/background/bg1.jpg";

class JoinBx extends Component {
  render() {
    return (
      <>
        <div
          className="section-area bg-fix ovbl-dark join-bx"
          style={{ backgroundImage: "url(" + bg1 + ")" }}
        >
          <div className="container">
            <div className="row join-content-bx text-white">
              <div className="col-md-8">
                <h2>See all our courses</h2>
              </div>
              <div className="col-md-4 text-right">
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
