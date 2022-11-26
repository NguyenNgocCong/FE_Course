import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useHistory } from "react-router-dom";
import { adminApi } from "../../api/adminApi";
import { userApi } from "../../api/userApi";
import useDebounce from "../../hooks/useDebounce";
import adv from "../../images/adv/adv.jpg";
import blogRecentPic1 from "../../images/blog/recent-blog/pic1.jpg";
import blogRecentPic3 from "../../images/blog/recent-blog/pic3.jpg";
import { combieImg } from "../../utils/index";

function ProductAside() {
  const history = useHistory();
  const [listCategory, setListCategory] = useState([]);
  const [recents, setRecents] = useState([]);
  const [topviews, setListTopViews] = useState([]);
  const [params, setParams] = useState({ keyword: "", category: "" });
  const [data, setDataTable] = useState([]);

  const debouncedSearchTerm = useDebounce(params.keyword, 500);

  const getListCategory = async () => {
    try {
      const response = await userApi.getListAllSubject();
      setListCategory(response);
    } catch (responseError) {
      console.log(responseError);
    }
  };
  const getListProduct = async () => {
    try {
      const response = await adminApi.getAllPackageView();
      setDataTable(response.data);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      history.push("/products", { keyword: debouncedSearchTerm });
    }
  }, [debouncedSearchTerm, history]);

  const handleSearch = (e) => {
    setParams({ ...params, keyword: e.target.value });
    if (!e.target.value) history.push("/products");
  };
  useEffect(() => {
    getListCategory();
    getListProduct();
    userApi.getListTopViewPackage(4).then((res) => {
      setListTopViews(res);
    });
  }, []);

  return (
    <>
      <aside className="side-bar sticky-top">
        <div className="widget">
          <h5 className="widget-title">Search </h5>
          <div className="search-bx style-1">
            <form role="search">
              <div className="input-group">
                <input
                  name="text"
                  className="form-control"
                  placeholder="Enter your keywords..."
                  type="text"
                  onChange={(e) => handleSearch(e)}
                />
                <span className="input-group-btn">
                  <button type="submit" className="btn">
                    <i className="fa fa-search"></i>
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className="widget widget_archive">
          <h5 className="widget-title style-1">All Courses</h5>
          <ul>
            <li className="active">
              <h6 role={"button"}
                onClick={(e) => {
                  history.push("/products", {
                    category: 0,
                  });
                }} >General</h6>
            </li>
            {listCategory.map((category) => {
              return (
                <li key={category?.id}>
                  <h6
                    role={"button"}
                    onClick={(e) => {
                      history.push("/products", {
                        category: category.id,
                      });
                    }}
                  >
                    {category.name}
                  </h6>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="widget  widget-courses">
          <h5 className="widget-title style-1">Top Courses</h5>
          <div>
            {topviews.map((x) => (
              <div
                style={{ margin: "15px 0px", boxShadow: "0px 5px 20px rgb(0 0 0 / 5%)" }}
                className="d-flex gap-1 round-2 widget-post"
                key={x.id}
              >
                {" "}
                <img
                  src={combieImg(x.image)}
                  alt=""
                  style={{objectFit:"cover"}}
                  width={100}
                  onError={({ currentTarget }) => {
                    currentTarget.src =
                      "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                  }}
                />{" "}
                <div className="ttr-post-info">
                  <div className="ttr-post-header">
                    <h6 className="post-title">
                      <Link to={`/courses-details/${x.id}`}> {x.title}</Link>
                    </h6>
                  </div>
                  <div className="ttr-post-meta">
                    <ul>
                      <li className="price">
                        <del>${x.listPrice}</del>
                        <h5>${x.salePrice}</h5>
                      </li>
                      <li className="review">{x.views} View</li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

export default ProductAside;
