import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setSearch } from "../../redux/reducers/blog";
import { useEffect } from "react";
import adv from "../../images/adv/adv.jpg";
import blogRecentPic1 from "../../images/blog/recent-blog/pic1.jpg";
import blogRecentPic3 from "../../images/blog/recent-blog/pic3.jpg";

function ProductAside() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [searchProduct, setSearchProduct] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearch(searchProduct));
        history.push("/blog");
    }
    useEffect(() => {
    }, [])

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
                                    onChange={(e) => setSearchProduct(e.target.value)}
                                />
                                <span className="input-group-btn">
                                    <button type="submit" className="btn"
                                        onClick={(e) => handleSearch(e)}
                                    >
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
                        <li>
                            <Link to="/courses-details">IT & Software</Link>
                        </li>
                        <li>
                            <Link to="/courses-details">Photography</Link>
                        </li>
                        <li>
                            <Link to="/courses-details">Programming Language</Link>
                        </li>
                        <li>
                            <Link to="/courses-details">Technology</Link>
                        </li>
                    </ul>
                </div>
                <div className="widget recent-posts-entry widget-courses">
                    <h5 className="widget-title style-1">Recent Courses</h5>
                    <div className="widget-post-bx">
                        <div className="widget-post clearfix">
                            <div className="ttr-post-media">
                                {" "}
                                <img style={{ height: "auto" }}
                                    src={blogRecentPic1}
                                    alt=""
                                />{" "}
                            </div>
                            <div className="ttr-post-info">
                                <div className="ttr-post-header">
                                    <h6 className="post-title">
                                        <Link to="/courses-details">
                                            Introduction EduChamp
                                        </Link>
                                    </h6>
                                </div>
                                <div className="ttr-post-meta">
                                    <ul>
                                        <li className="price">
                                            <del>$190</del>
                                            <h5>$120</h5>
                                        </li>
                                        <li className="review">03 Review</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="widget-post clearfix">
                            <div className="ttr-post-media">
                                {" "}
                                <img style={{ height: "auto" }}
                                    src={blogRecentPic3}
                                    alt=""
                                />{" "}
                            </div>
                            <div className="ttr-post-info">
                                <div className="ttr-post-header">
                                    <h6 className="post-title">
                                        <Link to="/courses-details">
                                            English For Tommorow
                                        </Link>
                                    </h6>
                                </div>
                                <div className="ttr-post-meta">
                                    <ul>
                                        <li className="price">
                                            <h5 className="free">Free</h5>
                                        </li>
                                        <li className="review">07 Review</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
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
