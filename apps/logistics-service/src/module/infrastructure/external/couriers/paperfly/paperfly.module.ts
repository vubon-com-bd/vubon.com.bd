import { Module } from '@nestjs/common';
import { PaperflyService } from './paperfly.service.js';

@Module({
  providers: [PaperflyService],
  exports: [PaperflyService],
})
export class PaperflyModule {}
