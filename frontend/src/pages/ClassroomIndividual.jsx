import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate, saveFile } from "../utils";
import axios from "axios";
import { ClassroomMembers } from "../components";

const ClassroomIndividual = () => {
  const { classroomId } = useParams();
  const { userOne } = useContext(AuthContext);
  const [classroomInfo, setClassroomInfo] = useState(null);
  const [formData, setFormData] = useState({ content: "", files: [] });
  const [posts, setPosts] = useState([]);
  const [commentsVisible, setCommentsVisible] = useState({});
  const [postComments, setPostComments] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [ok, setOk] = useState("");
  const [posting, setPosting] = useState(false);
  const fileInputRef = useRef(null);
  const [postMenu, setPostMenu] = useState({});
  const [classroomMembers, setClassroomMembers] = useState([]);
  const [navigationState, setNavigationState] = useState({
    workspace: true,
    members: false,
  });

  useEffect(() => {
    const fetchClassroomInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/classrooms/get-classroomInfo/${classroomId}`,
          { headers: { "x-auth-token": token } }
        );
        if (response.data) {
          setClassroomInfo(response.data);
          setClassroomMembers(response.data.users);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchClassroomInfo();
  }, [classroomId]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/classrooms/posts/${classroomId}`,
          { headers: { "x-auth-token": token } }
        );
        const sortedPost = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sortedPost);
      } catch (error) {
        alert("Error Fetching Posts");
      }
    };

    fetchPosts();
  }, [classroomId, success, ok]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, files: Array.from(e.target.files) });
  };

  const refreshForm = () => {
    setFormData({ content: "", files: [] });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (posting) return;
    const formDatas = new FormData();
    formDatas.append("author", userOne._id);
    formDatas.append("classroomId", classroomId);
    formDatas.append("content", formData.content);
    formData.files.forEach((file) => {
      formDatas.append("files", file);
    });

    try {
      const token = localStorage.getItem("token");
      setPosting(true);
      const response = await axios.post(
        "http://localhost:5000/api/classrooms/create-post",
        formDatas,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token,
          },
        }
      );
      if (response.data) {
        // setPosts((prevPosts) => [response.data, ...prevPosts]);
        setSuccess("Post created successfully");
        refreshForm();
      }
    } catch (error) {
      setError("Failed to make post" + error.message);
    } finally {
      setPosting(false);
      // setTimeout(() => setFormData({ content: "", files: [] }), 500);
      // if (fileInputRef.current) {
      //   fileInputRef.current.value = "";
      // }
      setTimeout(() => setError(""), 1000);
      setTimeout(() => setSuccess(""), 1000);
    }
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    const commentContent = postComments[postId].trim();
    if (!commentContent) {
      setError("Comment content cannot be empty.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/classrooms/posts/make-comment",
        {
          author: userOne._id,
          post: postId,
          content: commentContent,
        },
        { headers: { "x-auth-token": token } }
      );
      if (response.data) {
        setOk("Ok");
      }

      // if (response.data) {
      //   setPosts((prevPosts) =>
      //     prevPosts.map((post) =>
      //       post._id === postId
      //         ? { ...post, comments: [...post.comments, response.data] }
      //         : post
      //     )
      //   );
      // }
    } catch (error) {
      alert(error.message);
    } finally {
      setTimeout(() => setOk(""), 1000);
      setPostComments((prevComments) => ({
        ...prevComments,
        [postId]: "",
      }));
    }
  };

  const handlePostDelete = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/api/classrooms/posts/delete-post/${postId}`,
        { data: { userId: userOne._id }, headers: { "x-auth-token": token } }
      );
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      }
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  const handleCommentChange = (e, postId) => {
    setPostComments((prevComments) => ({
      ...prevComments,
      [postId]: e.target.value,
    }));
  };

  const togglePostMenu = (postId) => {
    setPostMenu((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleComments = (postId) => {
    setCommentsVisible((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  return (
    <div className="classroomIndividual-container">
      <div className="classroomIndividual-inner-container">
        <div className="classroomIndividual-banner-container">
          {classroomInfo ? (
            <>
              {" "}
              <div className="classroomIndividual-info">
                <span className="classroomIndividual-title">
                  {classroomInfo.title}
                </span>
                <span className="classroomIndividual-name">
                  {classroomInfo.name}
                </span>
                <span className="classroomIndividual-semester">
                  {classroomInfo.semester}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="classroomIndividual-info">
                <span className="classroomIndividual-title">
                  Classroom Titile
                </span>
                <span className="classroomIndividual-name">Classroom Name</span>
                <span className="classroomIndividual-semester">Semester</span>
              </div>
            </>
          )}
        </div>
        <div className="classroomIndividual-navbar-container">
          <ul className="classroomIndividual-navbar">
            <li className="classroomIndividual-navbar-items">
              <Link
                to="#"
                className={`classroomIndividual-item-link ${
                  navigationState.workspace ? "active" : ""
                }`}
                onClick={() =>
                  setNavigationState({
                    ...navigationState,
                    workspace: true,
                    members: false,
                  })
                }
              >
                WorkSpace
              </Link>
            </li>
            <li className="classroomIndividual-navbar-items">
              <Link
                to="#"
                className={`classroomIndividual-item-link ${
                  navigationState.members ? "active" : ""
                }`}
                onClick={() =>
                  setNavigationState({
                    ...navigationState,
                    workspace: false,
                    members: true,
                  })
                }
              >
                Members
              </Link>
            </li>
          </ul>
        </div>
        {navigationState.workspace && (
          <>
            <div className="classroomIndividual-create-post-container">
              <form
                onSubmit={handleSubmit}
                className="classroomIndividual-create-post-form"
              >
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
                    ref={fileInputRef}
                    type="file"
                    name="files"
                    multiple
                    onChange={handleFileChange}
                  />
                  <div className="cancel-post-btn">
                    <button
                      onClick={refreshForm}
                      type="button"
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="post-btn">
                      {posting ? "Posting.." : "Post"}
                    </button>
                  </div>
                </div>
                {error && (
                  <p className="create-post-status" style={{ color: "red" }}>
                    {error}
                  </p>
                )}
                {success && (
                  <p className="create-post-status" style={{ color: "green" }}>
                    {success}
                  </p>
                )}
              </form>
            </div>
            <div className="classroomIndividual-posts-container">
              {posts?.map((post) => (
                <div key={post._id} className="classroomIndividual-post">
                  <div className="classroomIndividual-post-owner-info">
                    {post.author._id === userOne._id && (
                      <>
                        <div className="classIndividual-post-actions">
                          <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            className="classIndividual-post-action-bar"
                            onClick={() => togglePostMenu(post._id)}
                          />
                          <div
                            className={
                              postMenu[post._id]
                                ? "classroomIndividual-delete-post"
                                : "classroomIndividual-delete-post not-active"
                            }
                          >
                            <button
                              type="button"
                              className="classroomIndividual-post-delete-btn"
                              onClick={() => handlePostDelete(post._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="classroomIndividual-owner-img">
                      {post.author.profileImage ? (
                        <img
                          src={post.author.profileImage}
                          alt="Profile"
                          className="post-owner-profileimg"
                        />
                      ) : (
                        <p>{post.author.name[0]}</p>
                      )}
                    </div>
                    <div className="classroomIndividual-owner-info">
                      <span className="owner-name">{post.author.name}</span>
                      <span className="date-posted">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className="classroomIndividual-post-content">
                    <p>{post.content}</p>
                  </div>
                  <div className="classroomIndividual-post-files">
                    {post.files?.map((file, index) => (
                      <div key={index} className="individual-file">
                        {/* <span>{`Download/File/${index}`}</span> */}
                        <span>{post.originalFileNames[index]}</span>
                        <FontAwesomeIcon
                          icon={faFileDownload}
                          className="download-file-btn"
                          onClick={() =>
                            saveFile(file, post.originalFileNames[index])
                          }
                        />
                        {/* <button className="download-file-btn">
                    </button> */}
                      </div>
                    ))}
                  </div>
                  <div className="classroomIndividual-post-comments-div">
                    <button
                      className="posts-total-comments-btn"
                      onClick={() => toggleComments(post._id)}
                    >
                      {commentsVisible[post._id]
                        ? "Hide Comments"
                        : `${post.comments.length} Comments`}
                    </button>
                    <div
                      className={
                        commentsVisible[post._id]
                          ? "comments-container active"
                          : "comments-container"
                      }
                    >
                      {post?.comments.map((comment, index) => (
                        <div
                          key={index}
                          className="classroomIndividual-post-comment"
                        >
                          <div className="post-comment-owner-img-div">
                            {comment.author.profileImage ? (
                              <img
                                src={comment.author.profileImage}
                                alt="profile"
                                className="comment-owner-profile-img"
                              />
                            ) : (
                              <div className="post-comment-owner-img">
                                {comment.author.name[0]}
                              </div>
                            )}
                          </div>
                          <div className="post-comment-details">
                            <span className="comment-owner-name">
                              {comment.author.name}{" "}
                              <small>{formatDate(comment.createdAt)}</small>
                            </span>
                            <p>{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <form
                      onSubmit={(e) => handleCommentSubmit(e, post._id)}
                      className="classroomIndividual-make-comment"
                    >
                      {userOne.profileImage ? (
                        <img
                          className="current-commentor"
                          src={userOne.profileImage}
                          alt="Profile"
                        />
                      ) : (
                        <div className="current-commentor">
                          <span>{userOne.name[0]}</span>
                        </div>
                      )}
                      <input
                        type="text"
                        id="comment"
                        name="comment"
                        className="comment"
                        placeholder="Add a comment...."
                        value={postComments[post._id]}
                        onChange={(e) => handleCommentChange(e, post._id)}
                      />
                      <button type="submit" className="make-comment-btn">
                        Comment
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {navigationState.members && (
          <>
            <div className="classroomIndividual-members-container">
              <ClassroomMembers
                classroomId={classroomId}
                classroomMembers={classroomMembers}
                setClassroomMembers={setClassroomMembers}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ClassroomIndividual;
