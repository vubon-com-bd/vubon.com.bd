import { Module } from '@nestjs/common';
import { UpsService } from './ups.service.js';

@Module({
  providers: [UpsService],
  exports: [UpsService],
})
export class UpsModule {}
