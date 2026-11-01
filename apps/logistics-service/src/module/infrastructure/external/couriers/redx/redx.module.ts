import { Module } from '@nestjs/common';
import { RedxService } from './redx.service.js';

@Module({
  providers: [RedxService],
  exports: [RedxService],
})
export class RedxModule {}
