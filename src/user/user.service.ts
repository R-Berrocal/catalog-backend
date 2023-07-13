import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, CreateUserOutput } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  private logger: Logger = new Logger(UserService.name);
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(
    createUserDto: CreateUserDto,
    photo?: Express.Multer.File,
  ): Promise<CreateUserOutput> {
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

      const createUser = await this.userModel.create(createUserDto);

      if (photo) {
        createUser.photo = photo.originalname;
      }

      return {
        ok: true,
        user: await createUser.save(),
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException(`User with id: ${id} not found`);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
