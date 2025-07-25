import mongoose from 'mongoose';
import { type } from 'os';
const Schema = mongoose.Schema;

const userSchema = Schema({
    fullname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['Admin',  'User'],
        default: 'User'
    }

}, { timestamps: true })

const User = mongoose.model('User', userSchema);
export default User;