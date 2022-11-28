import React, { useState } from "react";

import Count from "../elements/counter/counter-sensor";
import { useEffect } from "react";
import { userApi } from "../../api/userApi";
import { combieImg } from "../../utils";

function FeatureContent3(props) {
  const [listPost, setListPost] = useState([]);

  const getListPost = async () => {
    try {
      const response = await userApi.getListTopViewPost(4);
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
                  Read A Top <span>Blog knowledge</span>
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
                <Count counter={800} />+ Blog knowledge
              </h4>
            </div>
            <div className="col-lg-8">
              <div className="row">
                {listPost.map((item) => (
                  <div className="col-lg-6" title={item?.brefInfo}>
                    <div className="row" key={item?.id}>
                      <div className="col-lg-3">
                        <img
                          src={combieImg(item?.thumnailUrl)}
                          alt=""
                          onError={({ currentTarget }) => {
                            currentTarget.src =
                              "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                          }}
                        />
                      </div>
                      <div className="col-lg-9 blog-home">
                        <h5
                          onClick={() => {
                            window.location.href = "/lrs/blog/" + item?.id;
                          }}
                        >
                          {item?.title}
                        </h5>
                        <ul className="media-post">
                          <li>
                            <i className="fa fa-calendar"></i>
                            {" " +
                              new Date(item?.createDate).toLocaleDateString()}
                          </li>
                          <li>
                            <i className="fa fa-user"></i> By{" "}
                            {item?.author.fullname}
                          </li>
                          <li>
                            <i className="fa fa-eye"></i> {item?.views}
                          </li>
                        </ul>
                      </div>
                      <hr />
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
