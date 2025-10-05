import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DivisionsService } from './divisions.service';
import { CreateDivisionDto } from './dto/create-division.dto.js';
import { UpdateDivisionDto } from './dto/update-division.dto.js';

@ApiTags('divisions')
@Controller('divisions')
@Controller('divisions')
export class DivisionsController {
    constructor(private readonly divisionsService: DivisionsService) {}

    @ApiOperation({ summary: 'Crear división' })
    @ApiResponse({ status: 201, description: 'División creada' })
    @ApiResponse({ status: 409, description: 'Nombre duplicado' })
    @Post()
    create(@Body() dto: CreateDivisionDto) {
        return this.divisionsService.create(dto);
    }

    @ApiOperation({ summary: 'Listar todas las divisiones' })
    @Get()
    findAll() {
        return this.divisionsService.findAll();
    }

    @ApiOperation({ summary: 'Obtener una división por ID' })
    @ApiResponse({ status: 404, description: 'No encontrada' })
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.divisionsService.findOne(id);
    }

    @ApiOperation({ summary: 'Actualizar división' })
    @ApiResponse({ status: 409, description: 'Nombre duplicado' })
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDivisionDto) {
        return this.divisionsService.update(id, dto);
    }

    @ApiOperation({ summary: 'Eliminar división' })
    @ApiResponse({ status: 409, description: 'Tiene subdivisiones' })
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.divisionsService.remove(id);
    }

    @ApiOperation({ summary: 'Listar subdivisiones directas' })
    @Get(':id/subdivisions')
    findSubdivisions(@Param('id', ParseIntPipe) id: number) {
        return this.divisionsService.findSubdivisions(id);
    }
}
