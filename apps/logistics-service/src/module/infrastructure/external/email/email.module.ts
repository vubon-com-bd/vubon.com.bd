import { Global, Module } from '@nestjs/common';
import { LogisticsEmailService } from './email.service';

@Global()
@Module({
  providers: [LogisticsEmailService],
  exports: [LogisticsEmailService],
})
export class LogisticsEmailModule {}
