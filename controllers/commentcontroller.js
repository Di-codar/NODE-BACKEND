import Comment from "../models/comment.js";

const addComment = async (req, res) => {
  try {
    let {comment} = req.body;
    let {postId} = req.params;
    
    if (!comment) {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }
  
   const newCom = await Comment.create({
    comment,
    post: postId,
    author: req.user.id
   });
  

    res.status(201).json(newCom);
  } catch (error) {
    res.status(500).json({ message: "Error creating comment", error });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

const get1comment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comment", error });
  }
};

const update1comment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ message: "Comment cannot be empty" });
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { comment },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Error updating comment", error });
  }
};

const del1comment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};

export { addComment, getAllComments, get1comment, update1comment, del1comment };
// This code defines a set of functions to handle CRUD operations for comments in a MongoDB database using Mongoose.
// The functions include adding a comment, retrieving all comments, retrieving a single comment by ID,
// updating a comment by ID, and deleting a comment by ID.
