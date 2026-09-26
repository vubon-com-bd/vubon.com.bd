/**
 * Pipes Module
 * @module shared-kernel/modules/common
 */
import { Global, Module } from '@nestjs/common';
import { ParseUuidPipe, ValidationPipe } from '../../interfaces/pipes';

@Global()
@Module({
  providers: [ValidationPipe, ParseUuidPipe],
  exports: [ValidationPipe, ParseUuidPipe],
})
export class KernelPipesModule {}
