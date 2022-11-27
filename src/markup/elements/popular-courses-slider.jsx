import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { userApi } from "../../api/userApi";
import { combieImg } from "../../utils";

function PopularCoursesSlider() {
  const [listPackage, setListPackage] = useState([]);

  const getListPackage = async () => {
    try {
      const response = await userApi.getListTopViewPackage(8);
      setListPackage(response);
    } catch (responseError) {
      console.log(responseError);
    }
  };

  useEffect(() => {
    getListPackage();
  }, []);

  return (
    <>
      <div className="section-area section-sp1 bg-gray popular-courses-bx">
        <div className="container">
          <div className="heading-bx left">
            <h2 className="title-head">
              Top Buys <span>Courses</span>
            </h2>
          </div>
          <Slider
            {...settings}
            className="courses-carousel slick-slider owl-btn-1"
          >
            {listPackage.map((item, index) => (
              <div className="slider-item" key={item.id} >
                <div className="cours-bx">
                  <div className="action-box">
                    <img
                      src={(item.image != null && item.image) ? combieImg(item.image) : "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg"}
                      alt=""
                      style={{ objectFit: "cover" }}
                      onError={({ currentTarget }) => {
                        currentTarget.src =
                          "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                      }}
                    />
                    <div
                      onClick={() => {
                        window.location.href =
                          "/react/courses-details/" + item.id;
                      }}
                      className="btn btn-warning m-2"
                    >
                      Read More
                    </div>
                  </div>
                  <div className="info-bx">
                    <h5>
                      <div
                        onClick={() => {
                          window.location.href =
                            "/react/courses-details/" + item.id;
                        }}
                      >
                        {item.title}
                      </div>
                    </h5>
                    <div>
                      <i className="fa fa-user"></i>{" "}
                      {item?.sucjectCode?.expert?.user?.fullname}
                    </div>
                    <div>
                      <i className="fa fa-eye"></i> {item?.views}
                    </div>
                  </div>
                  <div className="cours-more-info">
                    <div className="price">
                      <del>${item.listPrice}</del>
                      <h5 className="fs-6">${item.salePrice}</h5>
                    </div>
                    <div className="review">
                      {/* <span> expert</span> */}
                      {/* <ul className="cours-star">
                      <li className="active"><i className="fa fa-star"></i></li>
                      <li className="active"><i className="fa fa-star"></i></li>
                      <li className="active"><i className="fa fa-star"></i></li>
                      <li><i className="fa fa-star"></i></li>
                      <li><i className="fa fa-star"></i></li>
                    </ul> */}
                      <div className="btn btn-warning">
                        <i className="fa fa-cart-plus"></i> Add to cart
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="container">
          <div className="heading-bx left">
            <h2 className="title-head">
              Top Views <span>Courses</span>
            </h2>
          </div>
          <Slider
            {...settings}
            className="courses-carousel slick-slider owl-btn-1"
          >
            {listPackage.map((item, index) => (
              <div className="slider-item" key={item.id} >
                <div className="cours-bx">
                  <div className="action-box">
                    <img
                      src={combieImg(item.image)}
                      alt=""
                      style={{ objectFit: "cover" }}
                      onError={({ currentTarget }) => {
                        currentTarget.src =
                          "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                      }}
                    />
                    <div
                      onClick={() => {
                        window.location.href =
                          "/react/courses-details/" + item.id;
                      }}
                      className="btn btn-warning m-2"
                    >
                      Read More
                    </div>
                  </div>
                  <div className="info-bx">
                    <h5>
                      <div
                        onClick={() => {
                          window.location.href =
                            "/react/courses-details/" + item.id;
                        }}
                      >
                        {item.title}
                      </div>
                    </h5>
                    <div>
                      <i className="fa fa-user"></i>{" "}
                      {item?.sucjectCode?.expert?.user?.fullname}
                    </div>
                    <div>
                      <i className="fa fa-eye"></i> {item?.views}
                    </div>
                  </div>
                  <div className="cours-more-info">
                    <div className="price">
                      <del>${item.listPrice}</del>
                      <h5 className="fs-6">${item.salePrice}</h5>
                    </div>
                    <div className="review">
                      {/* <span> expert</span> */}
                      {/* <ul className="cours-star">
                      <li className="active"><i className="fa fa-star"></i></li>
                      <li className="active"><i className="fa fa-star"></i></li>
                      <li className="active"><i className="fa fa-star"></i></li>
                      <li><i className="fa fa-star"></i></li>
                      <li><i className="fa fa-star"></i></li>
                    </ul> */}
                      <div className="btn btn-warning">
                        <i className="fa fa-cart-plus"></i> Add to cart
                      </div>
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
