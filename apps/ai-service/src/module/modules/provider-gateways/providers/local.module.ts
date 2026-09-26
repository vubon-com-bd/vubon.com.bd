import { Module } from '@nestjs/common';
import { LocalClient } from '../../../infrastructure/ml-providers/local/local.client';
import { LocalProvider } from '../../../infrastructure/ml-providers/local/local.provider';

@Module({
  providers: [LocalClient, LocalProvider],
  exports: [LocalProvider],
})
export class LocalModule {}
