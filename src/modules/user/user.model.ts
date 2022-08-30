import { getModelForClass, prop, pre } from '@typegoose/typegoose';
import argon2 from 'argon2';

// eslint-disable-next-line func-names, consistent-return, no-use-before-define
@pre<User>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const hash = await argon2.hash(this.password);
    this.password = hash;
    return next();
  }
})
export class User {
  @prop({ required: true, unique: true })
  public username: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  public async comparePassword(attempt: string): Promise<boolean> {
    return argon2.verify(this.password, attempt);
  }
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
