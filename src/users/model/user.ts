import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as chiperUtils from '../../common/cihper.utils';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: Types.ObjectId;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await chiperUtils.hash(this['password']);
    this['password'] = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
