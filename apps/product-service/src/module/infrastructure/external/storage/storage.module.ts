import { Global, Module } from '@nestjs/common';
import { S3Provider } from './providers/s3.provider';
import { LocalProvider } from './providers/local.provider';

@Global()
@Module({
  providers: [S3Provider, LocalProvider],
  exports: [S3Provider, LocalProvider],
})
export class StorageModule {}
