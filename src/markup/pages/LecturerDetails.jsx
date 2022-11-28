import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";

// Elements
import BlogAside from "../elements/blog-aside";

// Images
import bannerImg from "../../images/banner/banner2.jpg";
import testiPic1 from "../../images/testimonials/pic1.jpg";
import testiPic2 from "../../images/testimonials/pic2.jpg";
import testiPic3 from "../../images/testimonials/pic3.jpg";
import { userApi } from "../../api/userApi";
import ReactHtmlParser from "react-html-parser";
import { combieImg } from "../../utils/index";

function LecturerDetails(prop) {
  const [expert, setexpert] = useState(LecturerDetailsEx);
  const { id } = useParams();

  const getexpertById = async () => {
    console.log(id);
    const response = await userApi.getAllExpertId(id);
    setexpert(response);
  };

  useEffect(() => {
    // console.log(id);
    getexpertById();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <div className="page-content">
        <div
          className="page-banner ovbl-dark"
          style={{ height: "200px", backgroundImage: "url(" + bannerImg + ")" }}
        >
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">{expert.title}</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>Expert Details</li>
            </ul>
          </div>
        </div>

        <div className="content-block">
          <div className="section-area" style={{ marginTop: "20px" }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-xl-3 col-md-5 ">
                  <BlogAside />
                </div>
                <div className="col-lg-9 col-xl-9 col-md-7">
                  <div className="row">
                    <div className="col-lg-6 col-xl-6 col-md-6">
                      <div className="action-box blog-lg">
                        <img
                          style={{ height: "100%" }}
                          src={combieImg(expert.user.avatar)}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-xl-6 col-md-6">
                      <h3 className="post-title">{expert.jobTitle}</h3>
                      <div style={{ margin: "5px 0px" }}>
                        <span className="post-title">Company: </span>
                        <span>{expert.company}</span>
                      </div>
                      <div style={{ margin: "5px 0px" }}>
                        <span className="post-title">job: </span>
                        <span>{expert.jobTitle}</span>
                      </div>
                      <div style={{ margin: "5px 0px" }}>
                        <span className="post-title">fullName: </span>
                        <span>{expert.user.fullname}</span>
                      </div>
                      <div style={{ margin: "5px 0px" }}>
                        <span className="post-title">phone: </span>
                        <span>{expert.user.phoneNumber}</span>
                      </div>
                      <div style={{ margin: "5px 0px" }}>
                        <span className="post-title">email: </span>
                        <span>{expert.user.email}</span>
                      </div>
                      <p>{ReactHtmlParser(expert?.description)}</p>
                    </div>
                    <div className="info-bx">
                      <ul className="media-post">
                        <li>
                          <i className="fa fa-comments-o"></i>10 Comment
                        </li>
                      </ul>
                      <div className="ttr-divider bg-gray">
                        <i className="icon-dot c-square"></i>
                      </div>

                      <div className="ttr-divider bg-gray">
                        <i className="icon-dot c-square"></i>
                      </div>
                    </div>
                  </div>
                  <div className="clear" id="comment-list">
                    <div className="comments-area" id="comments">
                      <h4 className="comments-title">8 Comments</h4>
                      <div className="clearfix m-b20">
                        <ol className="comment-list">
                          <li className="comment">
                            <div className="comment-body">
                              <div className="comment-author vcard">
                                <img
                                  className="avatar photo"
                                  src={testiPic1}
                                  alt=""
                                />
                                <cite className="fn">John Doe</cite>
                                <span className="says">says:</span>
                              </div>
                              <div className="comment-meta">
                                <Link to="#">
                                  December 02, 2019 at 10:45 am
                                </Link>
                              </div>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nam vitae neque vitae sapien
                                malesuada aliquet. In viverra dictum justo in
                                vehicula. Fusce et massa eu ante ornare
                                molestie. Sed vestibulum sem felis, ac elementum
                                ligula blandit ac.
                              </p>
                              <div className="reply">
                                <Link to="#" className="comment-reply-link">
                                  Reply
                                </Link>
                              </div>
                            </div>
                          </li>
                          <li className="comment">
                            <div className="comment-body">
                              <div className="comment-author vcard">
                                <img
                                  className="avatar photo"
                                  src={testiPic2}
                                  alt=""
                                />
                                <cite className="fn">John Doe</cite>
                                <span className="says">says:</span>
                              </div>
                              <div className="comment-meta">
                                <Link to="#">
                                  December 02, 2019 at 10:45 am
                                </Link>
                              </div>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nam vitae neque vitae sapien
                                malesuada aliquet. In viverra dictum justo in
                                vehicula. Fusce et massa eu ante ornare
                                molestie. Sed vestibulum sem felis, ac elementum
                                ligula blandit ac.
                              </p>
                              <div className="reply">
                                <Link to="#" className="comment-reply-link">
                                  Reply
                                </Link>
                              </div>
                            </div>
                          </li>
                          <li className="comment">
                            <div className="comment-body">
                              <div className="comment-author vcard">
                                <img
                                  className="avatar photo"
                                  src={testiPic3}
                                  alt=""
                                />
                                <cite className="fn">John Doe</cite>
                                <span className="says">says:</span>
                              </div>
                              <div className="comment-meta">
                                <Link to="#">
                                  December 02, 2019 at 10:45 am
                                </Link>
                              </div>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nam vitae neque vitae sapien
                                malesuada aliquet. In viverra dictum justo in
                                vehicula. Fusce et massa eu ante ornare
                                molestie. Sed vestibulum sem felis ac elementum
                                ligula blandit ac.
                              </p>
                              <div className="reply">
                                <Link to="#" className="comment-reply-link">
                                  Reply
                                </Link>
                              </div>
                            </div>
                          </li>
                        </ol>
                        <div className="comment-respond" id="respond">
                          <h4 className="comment-reply-title" id="reply-title">
                            Leave a Reply{" "}
                            <small>
                              {" "}
                              <Link
                                style={{ display: "none" }}
                                to="#"
                                id="cancel-comment-reply-link"
                                rel="nofollow"
                              >
                                Cancel reply
                              </Link>{" "}
                            </small>{" "}
                          </h4>
                          <form className="comment-form">
                            <p className="comment-form-author">
                              <label htmlFor="author">
                                Name <span className="required">*</span>
                              </label>
                              <input
                                type="text"
                                value=""
                                name="Author"
                                placeholder="Author"
                                id="author"
                              />
                            </p>
                            <p className="comment-form-email">
                              <label htmlFor="email">
                                Email <span className="required">*</span>
                              </label>
                              <input
                                type="text"
                                value=""
                                placeholder="Email"
                                name="email"
                                id="email"
                              />
                            </p>
                            <p className="comment-form-url">
                              <label htmlFor="url">Website</label>
                              <input
                                type="text"
                                value=""
                                placeholder="Website"
                                name="url"
                                id="url"
                              />
                            </p>
                            <p className="comment-form-comment">
                              <label htmlFor="comment">Comment</label>
                              <textarea
                                rows="8"
                                name="comment"
                                placeholder="Comment"
                                id="comment"
                              ></textarea>
                            </p>
                            <p className="form-submit">
                              <input
                                type="submit"
                                value="Submit Comment"
                                className="submit"
                                name="submit"
                              />
                            </p>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

const LecturerDetailsEx = {
  id: 2,
  createdDate: "2022-11-18 17:41:16.834",
  updatedDate: "2022-11-18 17:41:16.834",
  company: "Fpt",
  jobTitle: "Techincal Architect",
  status: true,
  description:
    "<p>Với những kiến thức và kinh nghiệm của mình, anh luôn mong muốn chia sẻ những gì mình có được để góp phần phát triển nguồn nhân lực chất lượng cao tại Việt Nam và vì sự phát triển chung của cộng đồng IT Việt Nam</p>",
  user: {
    id: 7,
    createdDate: "2022-10-25 11:06:52.17",
    updatedDate: "2022-11-19 13:51:33.66",
    email: "expert1@gmail.com",
    username: "Thanhlt",
    password: "$2a$10$pgLrPMPC3m5QYUJ81ECQbeFCZAOFVCJquv5g8n8RN92iy.hPwN.Gq",
    fullname: "Lê Tiến Thành",
    phoneNumber: "098673456",
    avatar: "9c8c4dcd-d72b-4329-8389-2d1dc1d86394.jpg",
    note: null,
    active: true,
    registerToken: "QmxuJQILYsJKgXyPKXGJO0aAvdHS98",
    timeRegisterToken: "2022-10-25T11:06:52",
    resetPasswordToken: null,
    type_account: null,
    role: {
      setting_id: 8,
      type: {
        type_id: 1,
        title: "User Role",
      },
      setting_title: "Expert",
      setting_value: "ROLE_EXPERT",
      display_order: "role of expert",
      status: true,
      desciption: "role of expert",
    },
  },
};

export default LecturerDetails;
