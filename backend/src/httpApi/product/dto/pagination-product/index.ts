import { IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationProductDto {
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  page?: number;

  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  limit?: number;
}
