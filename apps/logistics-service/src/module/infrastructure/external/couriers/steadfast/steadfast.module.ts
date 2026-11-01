import { Module } from '@nestjs/common';
import { SteadfastService } from './steadfast.service.js';

@Module({
  providers: [SteadfastService],
  exports: [SteadfastService],
})
export class SteadfastModule {}
