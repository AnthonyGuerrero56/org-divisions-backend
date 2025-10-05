import { IsOptional, IsString, MaxLength, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDivisionDto {
    @ApiProperty({ maxLength: 45, example: 'Recursos Humanos', description: 'Nombre único de la división' })
    @IsString()
    @MaxLength(45)
    name: string;

    @ApiPropertyOptional({ minimum: 1, example: 1, description: 'ID de la división padre (opcional)' })
    @IsOptional()
    @IsInt()
    @Min(1)
    parentId?: number;

    @ApiPropertyOptional({ maxLength: 120, example: 'Ana María López', description: 'Nombre completo del embajador' })
    @IsOptional()
    @IsString()
    @MaxLength(120)
    ambassadorFullName?: string;
}