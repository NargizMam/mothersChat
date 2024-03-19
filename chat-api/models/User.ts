import mongoose, { HydratedDocument } from 'mongoose';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { UserFields, UserMethods, UserModal } from '../types';

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<UserFields, UserModal, UserMethods>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (this: HydratedDocument<UserFields>, email: string): Promise<boolean> {
        if (!this.isModified('email')) return true;
        const user = await User.findOne({ email: email });
        return !user;
      },
      message: 'This user was registered!',
    },
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['moderator', 'user'],
    default: 'user',
  },
  displayName: {
    type: String,
    required: true,
  },
  googleID: String,
  avatar: String,
  isActive: {
    type: Boolean,
    required: true,
  },
});

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};
UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model<UserFields, UserModal>('User', UserSchema);
export default User;
