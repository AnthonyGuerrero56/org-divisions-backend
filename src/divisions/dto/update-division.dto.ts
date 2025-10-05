import { PartialType } from '@nestjs/swagger';
import { CreateDivisionDto } from './create-division.dto.js';
import { IsOptional, IsString, MaxLength, IsInt, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDivisionDto extends PartialType(CreateDivisionDto) {
    @ApiPropertyOptional({ maxLength: 45 })
    @IsOptional()
    @IsString()
    @MaxLength(45)
    name?: string;

    @ApiPropertyOptional({ minimum: 1 })
    @IsOptional()
    @IsInt()
    @Min(1)
    parentId?: number;

    @ApiPropertyOptional({ maxLength: 120 })
    @IsOptional()
    @IsString()
    @MaxLength(120)
    ambassadorFullName?: string;
}
