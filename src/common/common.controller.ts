import { Controller, Get, Param, Query } from '@nestjs/common';
import { Model } from 'mongoose';
import { PaginationDto } from './dto/Pagination.dto';
import { CommonService } from './common.service';
import { ParseMongoIdPipe } from './pipes/parse-mongo-id.pipe';
import { ItemOutputType, PaginationOutputType } from './types';

export function createBaseController<T>() {
  @Controller('/')
  abstract class BaseController {
    readonly commonService: CommonService = new CommonService();
    constructor(readonly model: Model<T>) {}

    @Get()
    async findAll(
      @Query()
      paginationDto: PaginationDto,
    ): Promise<PaginationOutputType<T>> {
      return this.commonService.findAll<T>(paginationDto, this.model);
    }

    @Get(':id')
    async findOne(
      @Param('id', ParseMongoIdPipe) id: string,
    ): Promise<ItemOutputType<T>> {
      return this.commonService.findOne<T>(id, this.model);
    }
  }

  return BaseController;
}
