import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string) {
    if (!isValidObjectId(value))
      throw new BadRequestException('Validation failed (MongoId  is expected)');
    return value;
  }
}
