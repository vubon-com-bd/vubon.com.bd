import { Global, Module } from '@nestjs/common';
import { VendorChartService } from './chart.service.js';

@Global()
@Module({
  providers: [VendorChartService],
  exports: [VendorChartService],
})
export class VendorChartModule {}
