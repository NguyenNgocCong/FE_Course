import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { userApi } from "../../api/userApi";
import useDebounce from "../../hooks/useDebounce";
import { combieImg } from "../../utils";

function BlogAside() {
  const history = useHistory();
  const [listCategory, setListCategory] = useState([]);
  const [recentBlog, setRecentBlog] = useState([]);
  const [topviews, setListTopViews] = useState([]);
  const [params, setParams] = useState({ keyword: "", category: "" });

  const debouncedSearchTerm = useDebounce(params.keyword, 500);

  const getListCategory = async () => {
    try {
      const response = await userApi.getListCategoryPost();
      setListCategory(response);
    } catch (responseError) {
      console.log(responseError);
    }
  };

  const getListPost = async () => {
    try {
      const response = await userApi.getAllPost();
      const reversed = response.data.slice().reverse();
      let recent = [];
      for (let i = 0; i <= 2; i++) {
        recent.push(reversed[i]);
      }
      setRecentBlog(recent.filter((rec) => rec !== undefined));
    } catch (responseError) {
      console.log(responseError);
    }
  };

  useEffect(() => {
    getListCategory();
    getListPost();
    userApi.getListTopViewPost().then((res) => {
      setListTopViews(res);
    });
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      history.push("/blog", { keyword: debouncedSearchTerm });
    }
  }, [debouncedSearchTerm, history]);

  const handleSearch = (e) => {
    setParams({ ...params, keyword: e.target.value });
    if (!e.target.value) history.push("/blog");
  };
  return (
    <>
      <aside className="side-bar sticky-top">
        <div className="widget">
          <h5 className="widget-title">Search</h5>
          <div className="search-bx style-1">
            <form role="search">
              <div className="input-group">
                <input
                  name="text"
                  className="form-control"
                  placeholder="Enter your keywords..."
                  type="text"
                  value={params.keyword}
                  onChange={(e) => {
                    handleSearch(e);
                  }}
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
          <h5 className="widget-title">List of Blogs</h5>
          <ul>
            <li className="active">
              <h6 role={"button"}
                onClick={() => {
                  history.push("/blog", { category: 0 });
                }} to="#">General</h6>
            </li>
            {listCategory.map((category) => {
              return (
                <li key={category?.setting_id}>
                  <h6
                    role={"button"}
                    onClick={() => {
                      history.push("/blog", { category: category.setting_id });
                    }}
                  >
                    {category.setting_title}
                  </h6>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="widget">
          <h5 className="widget-title">Top Blog</h5>
          <div className="widget-post-bx">
            {topviews.map((blog) => {
              return (
                <div
                  style={{ margin: "15px 0px", boxShadow: "0px 5px 20px rgb(0 0 0 / 5%)" }}
                  className="p-1 d-flex gap-1 round-2 widget-post"
                  key={blog?.id}
                >
                  <img
                    src={combieImg(blog.thumnailUrl)}
                    alt=""
                    width={100}
                    onError={({ currentTarget }) => {
                      currentTarget.src =
                        "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                    }}
                  />{" "}
                  <div className="ttr-post-info">
                    <div className="ttr-post-header">
                      <h6 className="post-title">
                        <Link to={`/blog/${blog?.id}`}>{blog?.title}</Link>
                      </h6>
                    </div>
                    <ul className="media-post" style={{ marginBottom: "10px" }}>
                      <li>
                        <Link to={`/blog/${blog?.id}`}>
                          <i className="fa fa-calendar"></i>
                          {new Date(blog?.createDate).toLocaleDateString()}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="widget">
          <h5 className="widget-title">Recent Blog</h5>
          <div className="widget-post-bx">
            {recentBlog.map((blog) => {
              return (
                <div
                  style={{ margin: "15px 0px", boxShadow: "0px 5px 20px rgb(0 0 0 / 5%)" }}
                  className="p-1 d-flex gap-1 round-2 widget-post"
                  key={blog?.id}
                >
                  <img
                    src={combieImg(blog.thumnailUrl)}
                    alt=""
                    width={100}
                    onError={({ currentTarget }) => {
                      currentTarget.src =
                        "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                    }}
                  />{" "}
                  <div className="ttr-post-info">
                    <div className="ttr-post-header">
                      <h6 className="post-title">
                        <Link to={`/blog/${blog?.id}`}>{blog?.title}</Link>
                      </h6>
                    </div>
                    <ul className="media-post" style={{ marginBottom: "10px" }}>
                      <li>
                        <Link to={`/blog/${blog?.id}`}>
                          <i className="fa fa-calendar"></i>
                          {new Date(blog?.createDate).toLocaleDateString()}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="widget widget_tag_cloud">
          <h5 className="widget-title">Tags</h5>
          <div className="tagcloud">
            <Link
              to={"#"}
              role="button"
              onClick={() => setParams({ keyword: "net" })}
            >
              Asp.Net core
            </Link>
            <Link
              to={"#"}
              role="button"
              onClick={() => setParams({ keyword: "python" })}
            >
              Python PIP
            </Link>
            <Link
              to={"#"}
              role="button"
              onClick={() => setParams({ keyword: "nodejs" })}
            >
              NodeJs
            </Link>
            <Link
              to={"#"}
              role="button"
              onClick={() => setParams({ keyword: "react" })}
            >
              ReactJs
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

export default BlogAside;
