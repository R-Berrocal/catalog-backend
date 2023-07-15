import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
export class PaginationDto {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Min(1)
  limit?: number;
  @IsNumber()
  @IsOptional()
  @Min(0)
  page?: number;

  @IsOptional()
  populate?: string | string[];

  [key: string]: any;
}
