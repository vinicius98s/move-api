import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserInterface extends Document {
  email: string,
  name: string,
  password: string,
  bio?: string,
  balance: number,
  comparePassword(password: string): Promise<boolean>,
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    createIdexes: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  bio: String,
}, {
  timestamps: true,
});

UserSchema.pre<UserInterface>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    this.password = await bcrypt.hash(this.password, 8);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export default model<UserInterface>('User', UserSchema);
