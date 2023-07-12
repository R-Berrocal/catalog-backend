import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  private logger: Logger = new Logger(UserService.name);
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create({ photo, ...createUserDto }: CreateUserDto): Promise<User> {
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

      const createUser = await this.userModel.create(createUserDto);

      if (photo) {
        createUser.photo = photo.originalname;
      }

      return createUser.save();
    } catch (error) {
      this.logger.error(error);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    try {
      return this.userModel.findById(id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
