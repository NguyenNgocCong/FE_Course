import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import { userApi } from "../../api/userApi";
import { combieImg } from "../../utils";

const RecentNewsSlider = () => {
  const [listPost, setListPost] = useState([]);
  const [recentBlog, setRecentBlog] = useState([]);

  const getListPost = async () => {
    try {
      const response = await userApi.getListTopViewPost(8);
      setListPost(response);
    } catch (responseError) {
      console.log(responseError);
    }
  };
  const getListRecentPost = async () => {
    try {
      const response = await userApi.getListRecentPost(8);
      setRecentBlog(response);
    } catch (responseError) {
      console.log(responseError);
    }
  };
  useEffect(() => {
    getListRecentPost();
    getListPost();
  }, []);

  // const handleAddToCart = (data) => {
  //   if (!isLogin) {
  //     dispatch(addPackageLocal(data));
  //   } else {
  //     userApi.addToCard({ packageId: data.id }).then((res) => {
  //       console.log(res);
  //       toast.success("Add To Cart Success !", {
  //         position: toast.POSITION.BOTTOM_RIGHT,
  //       });
  //       dispatch(addPackageLocal(data));
  //     });
  //   }
  // };

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
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="section-area section-sp1">
        <div className="container">
          <div className="heading-bx left">
            <h2 className="title-head">
              Read A Top <span>Blog</span>
            </h2>
            <p>
              A place containing huge treasures of knowledge to help you reach
              your dreams
            </p>
          </div>
          <Slider
            {...settings}
            className="recent-news-carousel slick-slider owl-btn-1"
          >
            {listPost.map((item) => (
              <div className="slider-item" key={item?.id}>
                <div className="recent-news">
                  <div className="action-box">
                    <img
                      src={combieImg(item?.thumnailUrl)}
                      style={{ objectFit: "cover" }}
                      alt=""
                      onError={({ currentTarget }) => {
                        currentTarget.src =
                          "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                      }}
                    />
                  </div>
                  <div className="info-bx">
                    <h5 className="post-title">
                      <div to={`/blog/${item?.id}`}>{item.title}</div>
                    </h5>
                    <ul className="media-post">
                      <li>
                        <i className="fa fa-calendar"></i>
                        {" " + new Date(item?.createDate).toLocaleDateString()}
                      </li>
                      <li>
                        <i className="fa fa-user"></i> By{" "}
                        {item?.author.fullname}
                      </li>
                      <li>
                        <i className="fa fa-eye"></i> {item?.views}
                      </li>
                    </ul>
                    <p>{item.brefInfo}</p>
                    <div
                      onClick={() => {
                        window.location.href = "/lrs/blog/" + item?.id;
                      }}
                      className="btn btn-warning m-2"
                    >
                      Read More
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
              Read A News <span>Blog</span>
            </h2>
          </div>
          <Slider
            {...settings}
            className="recent-news-carousel slick-slider owl-btn-1"
          >
            {recentBlog.map((item) => (
              <div className="slider-item" key={item?.id}>
                <div className="recent-news">
                  <div className="action-box">
                    <img
                      src={combieImg(item?.thumnailUrl)}
                      alt=""
                      style={{ objectFit: "cover" }}
                      onError={({ currentTarget }) => {
                        currentTarget.src =
                          "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                      }}
                    />
                  </div>
                  <div className="info-bx">
                    <h5 className="post-title">
                      <div to={`/blog/${item?.id}`}>{item.title}</div>
                    </h5>
                    <ul className="media-post" style={{ minHeight: "85px" }}>
                      <li>
                        <i className="fa fa-calendar"></i>
                        {" " + new Date(item?.createDate).toLocaleDateString()}
                      </li>
                      <li>
                        <i className="fa fa-user"></i> By{" "}
                        {item?.author.fullname}
                      </li>
                      <li>
                        <i className="fa fa-eye"></i> {item?.views}
                      </li>
                    </ul>
                    <p>{item.brefInfo}</p>
                    <div
                      onClick={() => {
                        window.location.href = "/lrs/blog/" + item?.id;
                      }}
                      className="btn btn-warning m-2"
                    >
                      Read More
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
};

export default RecentNewsSlider;
