import { Module } from '@nestjs/common';
import { CodGateway } from './cod.gateway';

@Module({
  providers: [CodGateway],
  exports: [CodGateway],
})
export class CodModule {}
