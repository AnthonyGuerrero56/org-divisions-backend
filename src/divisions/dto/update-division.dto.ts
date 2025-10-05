import { PartialType } from '@nestjs/swagger';
import { CreateDivisionDto } from './create-division.dto.js';
import { IsOptional, IsString, MaxLength, IsInt, Min } from 'class-validator';

export class UpdateDivisionDto extends PartialType(CreateDivisionDto) {
  @IsOptional()
  @IsString()
  @MaxLength(45)
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  parentId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  ambassadorFullName?: string;
}
