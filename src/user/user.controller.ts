import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createBaseController } from '../common/common.controller';
import { User } from './schemas/user.schema';

const BaseController = createBaseController<User>();

@Controller('user')
export class UserController extends BaseController {
  constructor(
    private readonly userService: UserService,
    @InjectModel(User.name) readonly userModel: Model<User>,
  ) {
    super(userModel);
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<User> {
    return this.userService.create(createUserDto, photo);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
