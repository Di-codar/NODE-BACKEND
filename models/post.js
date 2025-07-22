import mongoose, { Types } from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = Schema({
    title: {
        type: String,
        require: true
    },
    snippet: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'User'
    },

},{ timestamps: true })

const Post = mongoose.model('Post', postSchema);
export default Post;