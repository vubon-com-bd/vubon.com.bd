import { Module } from '@nestjs/common';
import { ChartService } from './chart.service.js';
import { ChartJSProvider } from './providers/chartjs.provider.js';
import { EChartsProvider } from './providers/echarts.provider.js';
import { VegaProvider } from './providers/vega.provider.js';

@Module({
  providers: [ChartService, ChartJSProvider, EChartsProvider, VegaProvider],
  exports: [ChartService],
})
export class ChartModule {}
