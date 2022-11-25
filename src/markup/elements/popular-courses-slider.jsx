import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { userApi } from "../../api/userApi";

// Images
import coursesPic1 from "../../images/courses/pic1.jpg";
import coursesPic2 from "../../images/courses/pic2.jpg";
import coursesPic3 from "../../images/courses/pic3.jpg";
import coursesPic4 from "../../images/courses/pic4.jpg";
import { combieImg } from "../../utils";
import Packages from "../../admin/views/packages/Packages";

function PopularCoursesSlider() {
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
      <div className="section-area section-sp1 bg-gray popular-courses-bx">
        <div className="container">
          <div className="row">
            <div className="col-md-12 heading-bx left">
              <h2 className="title-head">
                Popular <span>Blogs</span>
              </h2>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page
              </p>
            </div>
          </div>
          <Slider
            {...settings}
            className="courses-carousel slick-slider owl-btn-1"
          >
            {listPost.map((item, index) => (
              <div className="slider-item" key={index}>
                <div className="cours-bx">
                  <div className="action-box">
                    <img src={combieImg(item.thumnailUrl)} alt="" />
                    <Link
                      to={"/blog/" + item.id}
                      className="btn btn-warning m-2"
                    >
                      Read More
                    </Link>
                  </div>
                  <div className="info-bx">
                    <span>{item.tag}</span>
                    <h6>
                      <Link to={"/blog/" + item.id}>{item.title}</Link>
                    </h6>
                  </div>
                  <div className="cours-more-info">
                    <div className="review">
                      <span className="d-block mt-2">
                        {item.review} Create At
                      </span>
                      <Link to={`/blog/${item?.id}`} className="text-secondary">
                        <i className="fa fa-calendar"></i>
                        {new Date(item?.createDate).toLocaleDateString()}
                      </Link>
                    </div>
                    <div className="price">
                      <i class="fa fa-user"></i>
                      <p> {item?.author.fullname}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 360,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export default PopularCoursesSlider;
