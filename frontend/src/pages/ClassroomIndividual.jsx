import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ClassroomIndividual = () => {
  const { classroomId } = useParams();
  const [formData, setFormData] = useState({ content: "", files: [] });
  const { userOne } = useContext(AuthContext);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const commentsRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, files: Array.from(e.target.files) });
  };

  const toggleComments = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  useEffect(() => {
    const commentsContainer = commentsRef.current;
    if (isCommentsVisible) {
      commentsContainer.style.maxHeight = commentsContainer.scrollHeight + "px";
    } else {
      commentsContainer.style.maxHeight = "0";
    }
  }, [isCommentsVisible]);

  return (
    <div className="classroomIndividual-container">
      <div className="classroomIndividual-inner-container">
        <div className="classroomIndividual-banner-container">
          <div className="classroomIndividual-info">
            <span className="classroomIndividual-title">CSE340</span>
            <span className="classroomIndividual-name">
              Computer Architecture
            </span>
            <span className="classroomIndividual-semester">Summer2024</span>
          </div>
        </div>
        <div className="classroomIndividual-navbar-container">
          <ul className="classroomIndividual-navbar">
            <li className="classroomIndividual-navbar-items">
              <Link to="#" className="classroomIndividual-item-link">
                WorkSpace
              </Link>
            </li>
            <li className="classroomIndividual-navbar-items">
              <Link to="#" className="classroomIndividual-item-link">
                Members
              </Link>
            </li>
          </ul>
        </div>
        <div className="classroomIndividual-create-post-container">
          <form className="classroomIndividual-create-post-form">
            <textarea
              name="content"
              id="content"
              className="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Make an announcment"
            />
            <div className="file-input-cancel-post">
              <input
                type="file"
                name="files"
                multiple
                onChange={handleFileChange}
              />
              <div className="cancel-post-btn">
                <button type="button" className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="post-btn">
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="classroomIndividual-posts-container">
          <div className="classroomIndividual-post">
            <div className="classroomIndividual-post-owner-info">
              <div className="classroomIndividual-owner-img">
                <p>A</p>
              </div>
              <div className="classroomIndividual-owner-info">
                <span className="owner-name">Jobair Al Sarkar</span>
                <span className="date-posted">10/05/2024</span>
              </div>
            </div>
            <div className="classroomIndividual-post-content">
              <p>Hello, Good People How are you doing.</p>
            </div>
            <div className="classroomIndividual-post-comments-div">
              <button
                className="posts-total-comments-btn"
                onClick={toggleComments}
              >
                {isCommentsVisible ? "Hide Comments" : "9 Comments"}
              </button>
              <div
                ref={commentsRef}
                className={
                  isCommentsVisible
                    ? "comments-container active"
                    : "comments-container"
                }
              >
                <div className="classroomIndividual-post-comment">
                  <div className="post-comment-owner-img">A</div>
                  <div className="post-comment-details">
                    <span className="comment-owner-name">
                      Ayesha Rahman <small>10/01/2024</small>
                    </span>
                    <p>That was a Nice one.</p>
                  </div>
                </div>
              </div>
              <form className="classroomIndividual-make-comment">
                {userOne.profileImage ? (
                  <img
                    className="current-commentor"
                    src={userOne.profileImage}
                    alt="Profile"
                  />
                ) : (
                  <div className="current-commentor">
                    <span>A</span>
                  </div>
                )}
                <input
                  type="text"
                  id="comment"
                  name="comment"
                  className="comment"
                  placeholder="Add a comment"
                />
                <button type="button" className="make-comment-btn">
                  Comment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomIndividual;
