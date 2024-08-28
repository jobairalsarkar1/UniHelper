const Classroom = require('../models/Classroom');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const cloudinary = require('cloudinary').v2;

// Create a new classroom
exports.createClassroom = async (req, res) => {
  try {
    const classroom = new Classroom({
      name: req.body.name,
      creator: req.user._id,
    });
    await classroom.save();
    res.status(201).json(classroom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add a student to the classroom
exports.addStudent = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.classroomId);
    classroom.users.push(req.body.userId);
    await classroom.save();
    res.status(200).json(classroom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove a student from the classroom
exports.removeStudent = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.classroomId);
    classroom.users.pull(req.body.userId);
    await classroom.save();
    res.status(200).json(classroom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a post
exports.createPost = async (req, res) => {
  try {
    const post = new Post({
      author: req.user._id,
      classroom: req.params.classroomId,
      content: req.body.content,
      files: req.body.files,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Upload file to Cloudinary
exports.uploadFile = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a comment
exports.createComment = async (req, res) => {
  try {
    const comment = new Comment({
      author: req.user._id,
      post: req.params.postId,
      content: req.body.content,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a classroom
exports.deleteClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.classroomId);
    if (classroom.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Only the creator can delete the classroom' });
    }
    await classroom.remove();
    res.status(200).json({ message: 'Classroom deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
