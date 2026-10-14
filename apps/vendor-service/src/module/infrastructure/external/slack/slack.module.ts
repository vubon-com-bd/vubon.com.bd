import { Global, Module } from '@nestjs/common';
import { VendorSlackService } from './slack.service.js';

@Global()
@Module({
  providers: [VendorSlackService],
  exports: [VendorSlackService],
})
export class VendorSlackModule {}
