import { Module } from '@nestjs/common';
import { CustomProvider } from './custom.provider';

@Module({
  providers: [CustomProvider],
  exports: [CustomProvider],
})
export class CustomModule {}
