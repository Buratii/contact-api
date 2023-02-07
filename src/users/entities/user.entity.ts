import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({ timestamps: true, validateBeforeSave: true })
export class Users {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
