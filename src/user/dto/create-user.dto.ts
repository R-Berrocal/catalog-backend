import { PickType } from '@nestjs/mapped-types';
import { User } from '../schemas/user.schema';

export class CreateUserDto extends PickType(User, [
  'name',
  'lastName',
  'email',
  'password',
  'phone',
]) {}

export class UserOutput {
  ok?: boolean;
  user?: User;
}
