import { Module } from '@nestjs/common';
import { SaParibahanService } from './sa-paribahan.service.js';

@Module({
  providers: [SaParibahanService],
  exports: [SaParibahanService],
})
export class SaParibahanModule {}
