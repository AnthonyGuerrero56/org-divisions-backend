import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { DivisionsService } from './divisions.service';
import { CreateDivisionDto } from './dto/create-division.dto.js';
import { UpdateDivisionDto } from './dto/update-division.dto.js';

@Controller('divisions')
export class DivisionsController {
    constructor(private readonly divisionsService: DivisionsService) {}

    @Post()
    create(@Body() dto: CreateDivisionDto) {
        return this.divisionsService.create(dto);
    }

    @Get()
    findAll() {
        return this.divisionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.divisionsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDivisionDto) {
        return this.divisionsService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.divisionsService.remove(id);
    }

    @Get(':id/subdivisions')
    findSubdivisions(@Param('id', ParseIntPipe) id: number) {
        return this.divisionsService.findSubdivisions(id);
    }
}
