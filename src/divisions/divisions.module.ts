import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivisionsService } from './divisions.service';
import { DivisionsController } from './divisions.controller';
import { Division } from './division.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Division])],
  providers: [DivisionsService],
  controllers: [DivisionsController],
  exports: [TypeOrmModule],
})
export class DivisionsModule {}
