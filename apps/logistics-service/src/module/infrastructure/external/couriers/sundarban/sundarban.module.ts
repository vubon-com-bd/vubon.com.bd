import { Module } from '@nestjs/common';
import { SundarbanService } from './sundarban.service.js';

@Module({
  providers: [SundarbanService],
  exports: [SundarbanService],
})
export class SundarbanModule {}
