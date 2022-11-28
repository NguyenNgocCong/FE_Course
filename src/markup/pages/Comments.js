import React from "react";
import { Link } from "react-router-dom";
import testiPic1 from "../../images/testimonials/pic1.jpg";
import testiPic2 from "../../images/testimonials/pic2.jpg";
import testiPic3 from "../../images/testimonials/pic3.jpg";

const Comments = () => {
  return (
    <div className="clear" id="comment-list">
      <div className="comments-area" id="comments">
        <h4 className="comments-title">8 Comments</h4>
        <div className="clearfix m-b20">
          <ol className="comment-list">
            <li className="comment">
              <div className="comment-body">
                <div className="comment-author vcard">
                  <img className="avatar photo" src={testiPic1} alt="" />
                  <cite className="fn">John Doe</cite>
                  <span className="says">says:</span>
                </div>
                <div className="comment-meta">
                  <Link to="#">December 02, 2019 at 10:45 am</Link>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  vitae neque vitae sapien malesuada aliquet. In viverra dictum
                  justo in vehicula. Fusce et massa eu ante ornare molestie. Sed
                  vestibulum sem felis, ac elementum ligula blandit ac.
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
                  <img className="avatar photo" src={testiPic2} alt="" />
                  <cite className="fn">John Doe</cite>
                  <span className="says">says:</span>
                </div>
                <div className="comment-meta">
                  <Link to="#">December 02, 2019 at 10:45 am</Link>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  vitae neque vitae sapien malesuada aliquet. In viverra dictum
                  justo in vehicula. Fusce et massa eu ante ornare molestie. Sed
                  vestibulum sem felis, ac elementum ligula blandit ac.
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
                  <img className="avatar photo" src={testiPic3} alt="" />
                  <cite className="fn">John Doe</cite>
                  <span className="says">says:</span>
                </div>
                <div className="comment-meta">
                  <Link to="#">December 02, 2019 at 10:45 am</Link>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  vitae neque vitae sapien malesuada aliquet. In viverra dictum
                  justo in vehicula. Fusce et massa eu ante ornare molestie. Sed
                  vestibulum sem felis ac elementum ligula blandit ac.
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
  );
};

export default Comments;
