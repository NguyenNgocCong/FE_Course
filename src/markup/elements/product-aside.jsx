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
      const response = await userApi.getListCategorySubject();
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
  }, []);

  return (
    <>
      <aside className="side-bar sticky-top">
        <div className="widget">
          <h6 className="widget-title">Search </h6>
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
              <Link to="#">General</Link>
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
        <div className="widget recent-posts-entry widget-courses">
          <h5 className="widget-title style-1">Recent Courses</h5>
          <div className="widget-post-bx">
            {data.slice(0, 4).map((x) => (
              <div className="widget-post clearfix" key={x.id}>
                <div className="ttr-post-media">
                  {" "}
                  <img
                    src={combieImg(x.image)}
                    style={{ objectFit: "contain" }}
                    alt=""
                    onError={({ currentTarget }) => {
                      currentTarget.src =
                        "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                    }}
                  />{" "}
                </div>
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
                      <li className="review">{x.views} Review</li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="widget">
          <Link to="/membership">
            <img src={adv} alt="" />
          </Link>
        </div>
      </aside>
    </>
  );
}

export default ProductAside;
