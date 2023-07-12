import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { HandleExceptionsModule } from 'src/handle-exceptions/handle-exceptions.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HandleExceptionsModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
