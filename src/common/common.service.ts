import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { PaginationDto } from './dto/Pagination.dto';
import { HandleExceptionsService } from 'src/handle-exceptions/handle-exceptions.service';

@Injectable()
export class CommonService {
  readonly logger: Logger = new Logger();
  readonly handleExceptionService: HandleExceptionsService =
    new HandleExceptionsService();

  async findAll<T>(
    { page = 1, limit = 10, populate, ...propsT }: PaginationDto,
    model: Model<T>,
  ) {
    try {
      const count = await model.countDocuments(propsT as T);
      const pages = Math.ceil(count / limit);
      const offset = (page - 1) * limit;
      const results = await model
        .find(propsT as T)
        .populate(populate)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit);

      return {
        pages,
        count,
        currentPage: page,
        results,
      };
    } catch (error) {
      this.logger.error(error);
      this.handleExceptionService.handleExceptions(error);
    }
  }
}
