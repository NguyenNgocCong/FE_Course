import React, { Component, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { userApi } from "../../api/userApi";

// Images
import testiPic1 from "../../images/testimonials/pic1.jpg";
import testiPic2 from "../../images/testimonials/pic2.jpg";
import testiPic3 from "../../images/testimonials/pic3.jpg";
import { combieImg } from "../../utils/index";
import Comments from "../pages/Comments";

// Content
const content = [
  {
    thumb: testiPic1,
    name: "Peter Packer",
    work: "Art Director",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...",
  },
  {
    thumb: testiPic2,
    name: "Eilderasse",
    work: "Developer",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...",
  },
  {
    thumb: testiPic3,
    name: "Atwood",
    work: "Designer",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...",
  },
];

const Testimonial1 = () => {
  const [commets, setComments] = useState({ data: [] });
  const { isLogin } = useSelector((state) => state.auth);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
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
          slidesToShow: 2,
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
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    userApi.getCommentWeb().then((x) => setComments(x));
  }, []);

  const handleComment = (data) => {
    if (isLogin) {
      userApi
        .createComment({ ...data })
        .then((res) => {
          toast.success(res.message);

          userApi.getCommentClass().then((x) => setComments(x));
        })
        .catch((e) => toast.error(e?.data?.message));
    }
  };

  console.log(commets.data);

  return (
    <>
      <div className="section-area section-sp2">
        <div className="container">
          <div className="row">
            <div className="col-md-12 heading-bx left">
              <h2 className="title-head">
                What People <span>Say</span>
              </h2>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page
              </p>
            </div>
          </div>

          <Slider
            {...settings}
            className="testimonial-carousel slick-slider owl-btn-1"
          >
            {commets.data.map((item, index) => (
              <div key={index} className="slider-item">
                <div className="testimonial-bx">
                  <div className="testimonial-head">
                    <div className="testimonial-thumb">
                      <img src={combieImg(item.user.avatar)} alt="" />
                    </div>
                    <div className="testimonial-info">
                      <h5 className="name">{item?.user?.fullname}</h5>
                      <p>-rateting:{item.vote}</p>
                    </div>
                  </div>
                  <div className="testimonial-content">
                    <p>{item.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <Comments hanleComment={handleComment} comments={commets.data} isHome />
      </div>
    </>
  );
};

export default Testimonial1;
