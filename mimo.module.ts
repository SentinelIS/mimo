import { Module } from '@nestjs/common';
import { MimoService } from './mimo.service';
import { MimoController } from './mimo.controller';

@Module({
  providers: [MimoService],
  controllers: [MimoController]
})
export class MimoModule {}
