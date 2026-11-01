import { Module } from '@nestjs/common';
import { PathaoService } from './pathao.service.js';

@Module({
  providers: [PathaoService],
  exports: [PathaoService],
})
export class PathaoModule {}
