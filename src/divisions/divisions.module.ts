import { Module } from '@nestjs/common';
import { DivisionsService } from './divisions.service';
import { DivisionsController } from './divisions.controller';

@Module({
  providers: [DivisionsService],
  controllers: [DivisionsController]
})
export class DivisionsModule {}
