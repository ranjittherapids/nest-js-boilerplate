import { IsString, IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateProductDto {
  @ValidateIf((object, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  readonly name?: string;

  @ValidateIf((object, value) => value !== undefined)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  readonly price?: number;

  @ValidateIf((object, value) => value !== undefined)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  readonly quantity?: number;
}
