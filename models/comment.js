import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = Schema({
    comment: {
        type: String,
        require: true,
    },
    author: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref:'User'
      },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'Post'
        }
},{timestamps:true});

const Comment = mongoose.model('comment', commentSchema);
export default Comment;
// This code defines a Mongoose schema and model for comments in a MongoDB database.
// The `commentSchema` defines a single field `coment` of type String, which is