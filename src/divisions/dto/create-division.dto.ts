import { IsOptional, IsString, MaxLength, IsInt, Min } from 'class-validator';

export class CreateDivisionDto {
  @IsString()
  @MaxLength(45)
  name: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  parentId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  ambassadorFullName?: string;
}