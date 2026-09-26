import { Module } from '@nestjs/common';
import { LocalClient } from './local.client';
import { LocalProvider } from './local.provider';

@Module({
  providers: [LocalClient, LocalProvider],
  exports: [LocalProvider],
})
export class LocalModule {}
