import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UserOutput } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { HandleExceptionsService } from 'src/handle-exceptions/handle-exceptions.service';

@Injectable()
export class UserService {
  private logger: Logger = new Logger(UserService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly handleExceptionService: HandleExceptionsService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    photo?: Express.Multer.File,
  ): Promise<UserOutput> {
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
      this.handleExceptionService.handleExceptions(error);
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }
}
