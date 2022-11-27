import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Layout
import Footer from "../layout/footer/footer1";
import Header from "../layout/header/header1";

// Elements
import BlogAside from "../elements/blog-aside";

// Images
import {
  CButton,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
} from "@coreui/react";
import ReactHtmlParser from "react-html-parser";
import bannerImg from "../../images/banner/banner1.jpg";
import PagingQuestion from "../elements/PagingQuestion/PagingQuestion";
import { userApi } from "./../../api/userApi";

const BlogClassicSidebar = () => {
  const location = useLocation();
  const [totalPages, setTotalPages] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);

  const [listPost, setListPost] = useState([]);

  const getListPost = async () => {
    try {
      const response = await userApi.getAllPost({
        ...location.state,
        page: pageIndex - 1,
      });
      setListPost(response.data);
      setTotalPages(response.totalPages);
    } catch (responseError) {
      console.log(responseError);
    }
  };

  useEffect(() => {
    getListPost();
    // eslint-disable-next-line
  }, [location.state, pageIndex]);

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
              <h1 className="text-white">Blog</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>Blog</li>
            </ul>
          </div>
        </div>
        <div className="content-block">
          <div className="section-area" style={{ marginTop: "20px" }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-xl-3 col-md-5 sticky-top">
                  <BlogAside />
                </div>
                <div className="col-lg-9 col-xl-9 col-md-7">
                  <CRow className="g-0">
                    {listPost.map((item) => (
                      <CRow key={item?.id}>
                        <CCol md={3}>
                          <CCardImage
                            src={
                              process.env.REACT_APP_BASE_URL +
                              "/api/account/downloadFile/" +
                              item?.thumnailUrl
                            }
                          />
                        </CCol>
                        <CCol md={9}>
                          <CCardTitle>
                            <Link to={`/blog/${item?.id}`}>{item?.title}</Link>
                          </CCardTitle>
                          <CCardText>
                            <ul className="media-post">
                              <li>
                                <i className="fa fa-calendar"></i>
                                {" " +
                                  new Date(
                                    item?.createDate
                                  ).toLocaleDateString()}
                              </li>
                              <li>
                                <i className="fa fa-user"></i> By{" "}
                                {item?.author.fullname}
                              </li>
                              <li>
                                <i className="fa fa-eye"></i> {item?.views}
                              </li>
                            </ul>
                          </CCardText>
                          <CCardText>
                            {ReactHtmlParser(item?.brefInfo)}
                          </CCardText>
                          <CButton>
                            <Link to={`/blog/${item?.id}`}>Read more</Link>
                          </CButton>
                        </CCol>
                        <hr />
                      </CRow>
                    ))}
                  </CRow>
                  {listPost.length !== 0 ? (
                    <>
                      <div className="pagination-bx rounded-sm gray m-b30 clearfix">
                        <PagingQuestion
                          totalPage={totalPages}
                          pageIndex={pageIndex}
                          onChange={(e) => {
                            setPageIndex(e);
                          }}
                        ></PagingQuestion>
                      </div>
                    </>
                  ) : (
                    <h5 style={{ marginLeft: "50px" }}>Can't find any blog</h5>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BlogClassicSidebar;
