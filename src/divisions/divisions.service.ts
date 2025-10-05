import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Division } from './division.entity';
import { CreateDivisionDto } from './dto/create-division.dto';
import { UpdateDivisionDto } from './dto/update-division.dto';

@Injectable()
export class DivisionsService {
    constructor(
        @InjectRepository(Division)
        private divisionsRepo: Repository<Division>,
    ) {}

    private randomInt(min: number, max: number): number {
        const lo = Math.ceil(min);
        const hi = Math.floor(max);
        return Math.floor(Math.random() * (hi - lo + 1)) + lo;
    }

    async create(dto: CreateDivisionDto): Promise<Division> {

        // validate name unique
        const exists = await this.divisionsRepo.exists({ where: { name: dto.name } as FindOptionsWhere<Division> });
        if (exists) {
            throw new ConflictException('Division name must be unique');
        }

        // validate parent, in case dto.parentId is provided
        let parent: Division | null = null;
        if (dto.parentId) {
            parent = await this.divisionsRepo.findOne({ where: { id: dto.parentId } });
            if (!parent) throw new BadRequestException('Parent division not found');
        }

        // create and save
        const division = this.divisionsRepo.create({
            name: dto.name.trim(),
            parentId: dto.parentId ?? null,
            ambassadorFullName: dto.ambassadorFullName?.trim() ?? null,
            level: this.randomInt(1, 5),
            collaboratorsCount: this.randomInt(1, 500),
        });
        return await this.divisionsRepo.save(division);
    }

    async findAll(): Promise<Division[]> {
        // regular list
        return this.divisionsRepo.find({ order: { id: 'ASC' } });
    }

    async findOne(id: number): Promise<Division> {
        const entity = await this.divisionsRepo.findOne({ where: { id } });
        if (!entity) throw new NotFoundException('Division not found');
        return entity;
    }

    async update(id: number, dto: UpdateDivisionDto): Promise<Division> {
        const entity = await this.findOne(id);

        // if name is changing, validate unique
        if (dto.name && dto.name.trim() !== entity.name) {
            const exists = await this.divisionsRepo.exists({ where: { name: dto.name.trim() } as FindOptionsWhere<Division> });
            if (exists) throw new ConflictException('Division name must be unique');
            entity.name = dto.name.trim();
        }

        if (dto.parentId !== undefined) {
            if (dto.parentId === null) {
                entity.parentId = null;
            } else {
                const parent = await this.divisionsRepo.findOne({ where: { id: dto.parentId } });
                if (!parent) throw new BadRequestException('Parent division not found');
                if (dto.parentId === id) throw new BadRequestException('A division cannot be its own parent');
                entity.parentId = dto.parentId;
            }
        }

        if (dto.ambassadorFullName !== undefined) {
            entity.ambassadorFullName = dto.ambassadorFullName?.trim() ?? null;
        }

        return this.divisionsRepo.save(entity);
    }

    async remove(id: number): Promise<void> {
        // if has children, reject
        const childrenCount = await this.divisionsRepo.count({ where: { parentId: id } });
        if (childrenCount > 0) {
            throw new ConflictException('Division has subdivisions; delete or reassign them first');
        }

        const result = await this.divisionsRepo.delete(id);
        if (result.affected === 0) throw new NotFoundException('Division not found');
    }

    async findSubdivisions(id: number): Promise<Division[]> {
        await this.ensureExists(id);
        return this.divisionsRepo.find({ where: { parentId: id }, order: { id: 'ASC' } });
    }

    private async ensureExists(id: number): Promise<void> {
        const exists = await this.divisionsRepo.exists({ where: { id } });
        if (!exists) throw new NotFoundException('Division not found');
    }
}
