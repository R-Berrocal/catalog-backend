import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class HandleExceptionsService {
  handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `${JSON.stringify(error.keyValue)} exist in db `,
      );
    }

    if (error.status === 404) {
      throw new NotFoundException(error.message);
    }

    throw new InternalServerErrorException(`Check server logs`);
  }
}
