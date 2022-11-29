import React, { useState } from "react";
import { Link } from "react-router-dom";
import testiPic1 from "../../images/testimonials/pic1.jpg";
import { combieImg } from "../../utils/index";

const Comments = ({ hanleComment, comments, isHome }) => {
  const [text, setText] = useState("");
  return (
    <div className="clear border p-4 my-4" id="comment-list">
      <div className="comments-area " id="comments">
        <h4 className="comments-title">{comments.length} Comments</h4>
        <div className="clearfix m-b20">
          {!isHome && (
            <ol className="comment-list">
              {comments?.map((x, i) => (
                <li className="comment" key={i}>
                  <div className="comment-body">
                    <div className="comment-author vcard">
                      <img
                        className="avatar photo"
                        src={() => combieImg(x.user.avatar)}
                        onError={({ currentTarget }) => {
                          console.log("errpr");
                          currentTarget.src = testiPic1;
                        }}
                        alt=""
                      />
                      <cite className="fn">{x.user?.fullname}</cite>
                      <span className="says">says:</span>
                    </div>
                    <div className="comment-meta">
                      <Link to="#">December 02, 2019 at 10:45 am</Link>
                    </div>
                    <p>{x.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
          <div className="comment-respond" id="respond">
            <h4 className="comment-reply-title" id="reply-title">
              Write a Comment{" "}
            </h4>

            <form
              className="comment-form"
              onSubmit={(e) => {
                e.preventDefault();
                hanleComment({
                  body: text,
                });
                setText("");
              }}
            >
              <p className="comment-form-comment">
                <label htmlFor="comment">Comment</label>
                <textarea
                  rows="8"
                  name="comment"
                  placeholder="Comment"
                  id="comment"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
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
