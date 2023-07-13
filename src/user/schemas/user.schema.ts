import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { CoreSchema } from 'src/common/schemas/core.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends CoreSchema {
  @IsNotEmpty()
  @Prop({ required: true, trim: true })
  name: string;

  @IsNotEmpty()
  @Prop({ required: true, trim: true })
  lastName: string;

  @IsEmail()
  @Prop({ required: true, unique: true })
  email: string;

  @IsStrongPassword()
  @Prop({ required: true })
  password: string;

  @IsOptional()
  @Prop()
  phone?: string;

  @IsOptional()
  @Prop()
  photo?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
