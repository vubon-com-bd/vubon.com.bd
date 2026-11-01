import { Module } from '@nestjs/common';
import { AramexService } from './aramex.service.js';

@Module({
  providers: [AramexService],
  exports: [AramexService],
})
export class AramexModule {}
