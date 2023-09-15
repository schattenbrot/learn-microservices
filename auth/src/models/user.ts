import mongoose, { Schema } from 'mongoose';
import { Password } from '../services/password';

// An interface describing the properties of a user
interface UserType {
  email: string;
  password: string;
}

// An interface describing the properties of a user model
interface UserModel extends mongoose.Model<UserDoc> {
  build(user: UserType): UserDoc;
}

// An interface describing the properties of a user document
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
      versionKey: false,
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (user: UserType) => {
  return new User(user);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
