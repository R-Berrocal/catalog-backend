import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CoreSchema } from 'src/common/schemas/core.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends CoreSchema {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phone: string;

  @Prop()
  photo: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
