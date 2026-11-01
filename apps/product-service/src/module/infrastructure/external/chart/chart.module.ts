/**
 * Chart Module
 * @module product-service/infrastructure/external/chart
 */
import { Global, Module } from '@nestjs/common';
import { ChartService } from './chart.service.js';

@Global()
@Module({
  providers: [ChartService],
  exports: [ChartService],
})
export class ChartModule {}
