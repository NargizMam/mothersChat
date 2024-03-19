import mongoose, { Types } from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;
const PostSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
      ref: 'User',
      validate: {
        validator: async (value: Types.ObjectId) => {
          const user = await User.findById(value);
          return Boolean(user);
        },
        message: 'Пользователь не найден!',
      },
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
const Post = mongoose.model('Post', PostSchema);
export default Post;
