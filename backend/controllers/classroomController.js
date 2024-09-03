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
    const classroom = await Classroom.findById(classroomId);
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
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
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
        fileUrls.push(result.secure_url);
      }
    }

    const newPost = await Post({
      author,
      classroom: classroomId,
      content,
      files: fileUrls,
    });

    await newPost.save();
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

const getClassroomPosts = async (req, res) => {
  const { classroomId } = req.params;
  try {
    const posts = await Post.find({ classroom: classroomId })
      .populate({
        path: "comments",
        model: "Comment",
        select: "content author createdAt",
        populate: {
          path: "author",
          model: "User",
          select: "name profileImage",
        },
      })
      .populate("author", "name profileImage");
    // console.log(posts);
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

module.exports = {
  createClassroom,
  getClassrooms,
  deleteClassroom,
  getClassroomInfo,
  createPost,
  getClassroomPosts,
  makeComment,
};
