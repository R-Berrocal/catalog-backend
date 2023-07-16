import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { PaginationDto } from './dto/Pagination.dto';
import { HandleExceptionsService } from 'src/handle-exceptions/handle-exceptions.service';
import { ItemOutputType, PaginationOutputType } from './types';

@Injectable()
export class CommonService {
  readonly logger: Logger = new Logger();
  readonly handleExceptionService: HandleExceptionsService =
    new HandleExceptionsService();

  async findAll<T>(
    { page = 1, limit = 10, populate, ...propsT }: PaginationDto,
    model: Model<T>,
  ): Promise<PaginationOutputType<T>> {
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

  async findOne<T>(id: string, model: Model<T>): Promise<ItemOutputType<T>> {
    try {
      const item = await model.findById(id);
      if (!item) throw new NotFoundException(`User with id: ${id} not found`);
      return { ok: true, item };
    } catch (error) {
      this.logger.error(error);
      this.handleExceptionService.handleExceptions(error);
    }
  }

  async remove<T>(id: string, model: Model<T>): Promise<ItemOutputType<T>> {
    try {
      const item = await this.findOne(id, model);
      await model.findByIdAndUpdate(id, { active: false });
      return item;
    } catch (error) {
      console.log(error);
      this.logger.error(error);
      this.handleExceptionService.handleExceptions(error);
    }
  }
}
