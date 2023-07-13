import { PickType } from '@nestjs/mapped-types';
import { User } from '../schemas/user.schema';
import { CoreOutput } from 'src/common/dto/core.output';

export class CreateUserDto extends PickType(User, [
  'name',
  'lastName',
  'email',
  'password',
  'phone',
]) {}

export class CreateUserOutput extends CoreOutput {
  user?: User;
}
