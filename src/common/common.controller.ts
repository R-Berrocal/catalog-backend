import { Controller, Get, Query } from '@nestjs/common';
import { Model } from 'mongoose';
import { PaginationDto } from './dto/Pagination.dto';
import { CommonService } from './common.service';

export function createBasePaginationDto<T>() {
  @Controller('/')
  abstract class BaseController {
    readonly commonService: CommonService = new CommonService();
    constructor(readonly model: Model<T>) {}

    @Get()
    async findAll(
      @Query()
      paginationDto: PaginationDto,
    ) {
      return this.commonService.findAll<T>(paginationDto, this.model);
    }
  }

  return BaseController;
}
