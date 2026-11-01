import { Module } from '@nestjs/common';
import { DhlService } from './dhl.service.js';

@Module({
  providers: [DhlService],
  exports: [DhlService],
})
export class DhlModule {}
