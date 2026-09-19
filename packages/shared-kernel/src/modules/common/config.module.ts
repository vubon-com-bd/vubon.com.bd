/**
 * Config Module
 * @module shared-kernel/modules/common
 *
 * Loads shared configuration from @vubon/shared-config।
 */
import { Global, Module } from '@nestjs/common';
import { APP_CONFIG, APP_MODE } from '@vubon/shared-config/common';
import { TOKENS } from '../tokens';

@Global()
@Module({
  providers: [
    { provide: TOKENS.APP_CONFIG, useValue: APP_CONFIG },
    { provide: TOKENS.APP_MODE, useValue: APP_MODE },
  ],
  exports: [TOKENS.APP_CONFIG, TOKENS.APP_MODE],
})
export class KernelConfigModule {}
