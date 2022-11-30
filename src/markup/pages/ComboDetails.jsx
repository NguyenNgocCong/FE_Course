import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../layout/footer/footer1";
import Header from "../layout/header/header1";
import { Markup } from "interweave";
import DataTable from "react-data-table-component";
import { comboApi } from "../../api/comboApi";
import bannerImg from "../../images/banner/banner2.jpg";
import blogDefaultThum1 from "../../images/blog/default/thum1.jpg";
import Reviews from "./Reviews";
import Comments from "./Comments";
import { useSelector } from "react-redux";
import { userApi } from "../../api/userApi";
import { toast } from "react-toastify";

function CoursesDetails(props) {
  const params = useParams();
  const { isLogin } = useSelector((state) => state.auth);
  const [commets, setComments] = useState({ data: [] });
  const [res, setRes] = useState(comboDetailsEx);

  const { id } = params;

  useEffect(() => {
    comboApi.getComboById(id).then((res) => {
      setRes(res);
    });
    userApi.getCommentCombo().then((x) => setComments(x));
  }, [id]);

  const handleComment = (data) => {
    if (isLogin) {
      userApi
        .createComment({ ...data, comboId: id })
        .then((res) => {
          toast.success(res.message);

          userApi.getCommentCombo().then((x) => setComments(x));
        })
        .catch((e) => toast.error(e?.data?.message));
    }
  };

  const handleReview = (vote) => {
    if (isLogin) {
      userApi
        .createComment({ vote, comboId: id })
        .then((res) => {
          toast.success(res.message);
          userApi.getCommentCombo().then((x) => setComments(x));
        })
        .catch((e) => toast.error(e?.data?.message));
    }
  };

  const columns = [
    {
      name: "Title",
      minWidth: "200px",
      width: "225px",
      maxWidth: "250",
      selector: (row) => row?._package.title,
      sortable: true,
    },
    {
      name: "Price",
      right: true,
      width: "100px",
      selector: (row) => row?.salePrice + "$",
      sortable: true,
    },
  ];
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
              <h1 className="text-white">{res.title}</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>{}</li>
            </ul>
          </div>
        </div>
        <div className="content-block">
          <div className="section-area" style={{ marginTop: "20px" }}>
            <div className="container">
              <div className="row d-flex flex-row-reverse">
                <div className="courses-post">
                  <div className="row">
                    <div className="col-md-12 col-lg-4 ">
                      <div className="ttr-post-media media-effect">
                        <Link to="#">
                          <img src={blogDefaultThum1} alt="" />
                        </Link>
                      </div>
                      <div className="course-detail-bx">
                        <div className="course-price">
                          <del>
                            ${" "}
                            {res.comboPackages.reduce(
                              (total, x) => total + x._package.listPrice,
                              0
                            )}
                          </del>
                          <h4 className="price">
                            $
                            {res.comboPackages.reduce(
                              (total, x) => total + x._package.salePrice,
                              0
                            )}
                          </h4>
                        </div>
                        <div className="course-buy-now text-center">
                          <Link to="#" className="btn radius-xl btn-primary">
                            Buy Now
                          </Link>
                        </div>
                        <DataTable columns={columns} data={res.comboPackages} />
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-8">
                      <div className="ttr-post-title ">
                        <h2 className="post-title">{res.title}</h2>
                      </div>
                      <div className="ttr-post-text">
                        <div className="p-3">
                          <Markup content={res.description} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <Reviews onReview={handleReview} comments={commets.data} /> */}
                <Comments
                  hanleComment={handleComment}
                  comments={commets.data}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

const comboDetailsEx = {
  id: 1,
  createdDate: "2022-11-20 19:49:15.144",
  updatedDate: "2022-11-20 19:49:15.144",
  title: "Combo khóa học lập trình Java Spring và reactJS",
  description: "",
  comboPackages: [
    {
      id: 2,
      createdDate: "2022-11-20 19:49:15.17",
      updatedDate: "2022-11-20 19:49:15.17",
      _package: {
        id: 2,
        createdDate: "2022-11-20 19:35:50.669",
        updatedDate: "2022-11-20 19:35:50.669",
        title: "khóa học reactjs cơ bản",
        excerpt: "",
        duration: "50",
        description: "",
        status: true,
        listPrice: 6000000.0,
        salePrice: 4500000.0,
      },
      salePrice: 4000000.0,
    },
    {
      id: 1,
      createdDate: "2022-11-20 19:49:15.163",
      updatedDate: "2022-11-20 19:49:15.163",
      _package: {
        id: 1,
        createdDate: "2022-11-20 19:16:55.948",
        updatedDate: "2022-11-20 19:16:55.948",
        title: "khóa học spring MVC cơ bản",
        excerpt: "",
        duration: "60",
        description: "",
        status: true,
        listPrice: 3000000.0,
        salePrice: 1800000.0,
      },
      salePrice: 1500000.0,
    },
  ],
};
export default CoursesDetails;
