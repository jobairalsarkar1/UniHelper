const Classroom = require("../models/Classroom");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const cloudinary = require("../config/cloudinaryConfig");

const createClassroom = async (req, res) => {
  //   console.log(req.body);
  try {
    const { title, name, semester, creator } = req.body;
    const newClassroom = new Classroom({
      title,
      name,
      semester,
      creator,
      users: [creator],
    });
    await newClassroom.save();
    res.status(201).json({
      message: "Classroom created successfully",
      classroom: newClassroom,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating classroom." });
  }
};

const getClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find().populate("users");
    res.status(200).json(classrooms);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch classrooms." });
  }
};

const deleteClassroom = async (req, res) => {
  const { classroomId } = req.params;
  const userId = req.body.userId;
  //   console.log(classroomId);
  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ message: "Classroom do not exists." });
    }

    if (classroom.creator.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this classroom. " });
    }

    const posts = await Post.find({ classroom: classroomId });
    for (const post of posts) {
      await Comment.deleteMany({ post: post._id });
    }

    await Post.deleteMany({ classroom: classroomId });

    await Classroom.findByIdAndDelete(classroomId);
    res.status(200).json({ message: "Classroom deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Classroom is not deleted. Please try again..." });
  }
};

const getClassroomInfo = async (req, res) => {
  const { classroomId } = req.params;
  try {
    const classroom = await Classroom.findById(classroomId).populate({
      path: "users",
      select: "name email ID status profileImage",
    });
    if (!classroom) {
      return res.status(404).json({ message: "Classroom do not exists." });
    }
    res.status(200).json(classroom);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const createPost = async (req, res) => {
  // console.log("body", req.body);
  // console.log("files", req.files);
  // console.log("author", req.user.id);
  try {
    const { author, classroomId, content } = req.body;
    const fileUrls = [];
    let originalFileNames = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        // console.log("you file:", file);
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ resource_type: "auto" }, (error, result) => {
              if (error) {
                return reject(error);
              }
              resolve(result);
            })
            .end(file.buffer);
        });
        // console.log("Result:", result);
        fileUrls.push(result.secure_url);
        // console.log(file.originalname, "ooooooooooooooo");
        originalFileNames.push(file.originalname);
      }
    }

    // console.log("dangerzone1 +++++++++++++++++++++++++");

    const newPost = await Post({
      author,
      classroom: classroomId,
      content,
      files: fileUrls,
      originalFileNames,
    });

    // console.log("NewPost:   _______________", newPost);

    await newPost.save();
    // console.log("?????????????????????????????????????");
    await Classroom.findByIdAndUpdate(
      classroomId,
      { $push: { posts: newPost._id } },
      { new: true, useFindAndModify: false }
    );
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Failed to create Post." });
  }
};

const deletePost = async (req, res) => {
  console.log("Well Well Well");
  const { postId } = req.params;
  const userId = req.body.userId;
  console.log(postId, userId);
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post do not exist." });
    }
    const classroom = await Classroom.findById(post.classroom);
    if (!classroom || post.author.toString() !== userId) {
      return res
        .status(404)
        .json({ message: "You are not authorized to delete the post." });
    }
    await Comment.deleteMany({ post: postId });
    await Classroom.findByIdAndUpdate(
      post.classroom,
      { $pull: { posts: postId } },
      { new: true, useFindAndModify: false }
    );
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const getClassroomPosts = async (req, res) => {
  const { classroomId } = req.params;
  try {
    const posts = await Post.find({ classroom: classroomId })
      .populate({
        path: "comments",
        populate: {
          path: "author",
        },
      })
      .populate("author");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Posts" });
  }
};

const makeComment = async (req, res) => {
  const { author, post, content } = req.body;
  // console.log("body", req.body);
  try {
    const newComment = await Comment({
      author,
      post,
      content,
    });
    if (!newComment) {
      return res.status(404).json({ message: "Failed to make comment." });
    }
    await newComment.save();
    await Post.findByIdAndUpdate(
      post,
      { $push: { comments: newComment._id } },
      { new: true, useFindAndModify: false }
    );
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const addClassroomMembers = async (req, res) => {
  const { classroomId } = req.params;
  const { members } = req.body;
  try {
    const classroom = await Classroom.findByIdAndUpdate(
      classroomId,
      {
        $addToSet: { users: { $each: members } },
      },
      { new: true }
    ).populate("users", "name email ID profileImage");
    res.status(200).json(classroom);
  } catch (error) {
    res.status(500).json({ message: "Error adding members." });
  }
};

module.exports = {
  createClassroom,
  getClassrooms,
  deleteClassroom,
  getClassroomInfo,
  createPost,
  deletePost,
  getClassroomPosts,
  makeComment,
  addClassroomMembers,
};
