import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { UserService } from './user.service';
import { CreateUserDto, UserOutput } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createBaseController } from '../common/common.controller';
import { User } from './schemas/user.schema';

const PaginationDto = createBaseController<User>();

@Controller('user')
export class UserController extends PaginationDto {
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
  ): Promise<UserOutput> {
    return this.userService.create(createUserDto, photo);
  }

  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
