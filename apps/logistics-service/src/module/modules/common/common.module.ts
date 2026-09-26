import { Global, Module } from '@nestjs/common';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

@Global()
@Module({
  imports: [KernelCommonModule],
  exports: [KernelCommonModule],
})
export class LogisticsCommonModule {}
