import React, { Component, useState } from "react";
import { Link } from "react-router-dom";

// Elements
import Count from "../elements/counter/counter-sensor";

// Images
import icon1 from "../../images/icon/icon1.png";
import icon2 from "../../images/icon/icon2.png";
import icon3 from "../../images/icon/icon3.png";
import icon4 from "../../images/icon/icon4.png";
import { useEffect } from "react";
import { userApi } from "../../api/userApi";

const icons = [icon1, icon2, icon3, icon4];

function FeatureContent3(props) {
  const [listPost, setListPost] = useState([]);

  const getListPost = async () => {
    try {
      const response = await userApi.getListTopViewPost();
      console.log(response);
      setListPost(response);
    } catch (responseError) {
      console.log(responseError);
    }
  };

  useEffect(() => {
    getListPost();
  }, []);
  return (
    <>
      <div className="section-area section-sp1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 m-b50">
              <div className="heading-bx left mb-3">
                <h2 className="title-head m-b0">
                  Learn A New <span>Skill online</span>
                </h2>
                <p className="m-b0">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page
                </p>
              </div>
              <p className="m-b15">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a
                galley.
              </p>
              <h4 className="m-b30">
                <Count counter={57000} /> Online Courses
              </h4>
              <Link to="/contact-1" className="btn button-md">
                Join Now
              </Link>
            </div>
            <div className="col-lg-8">
              <div className="row">
                {listPost.map((item, index) => (
                  <div key={index} className="col-lg-6 col-md-6 col-sm-6 m-b40">
                    <div className="feature-container">
                      <div className="feature-md text-white m-b20">
                        <Link to="#" className="icon-cell">
                          <img src={icons[index]} alt="" />
                        </Link>
                      </div>
                      <div className="icon-content">
                        <h5 className="ttr-tilte">{item.title}</h5>
                        <p>{item.Text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeatureContent3;
