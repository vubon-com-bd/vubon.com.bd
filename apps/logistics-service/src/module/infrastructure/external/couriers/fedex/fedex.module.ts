import { Module } from '@nestjs/common';
import { FedexService } from './fedex.service.js';

@Module({
  providers: [FedexService],
  exports: [FedexService],
})
export class FedexModule {}
