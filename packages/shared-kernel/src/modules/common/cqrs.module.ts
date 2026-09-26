/**
 * CQRS Module
 * @module shared-kernel/modules/common
 *
 * Wraps @nestjs/cqrs and registers shared TOKENS।
 */
import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TOKENS } from '../tokens';

@Global()
@Module({
  imports: [CqrsModule],
  providers: [
    {
      provide: TOKENS.COMMAND_BUS_NAME,
      useValue: 'vubon-command-bus',
    },
    {
      provide: TOKENS.QUERY_BUS_NAME,
      useValue: 'vubon-query-bus',
    },
  ],
  exports: [CqrsModule, TOKENS.COMMAND_BUS_NAME, TOKENS.QUERY_BUS_NAME],
})
export class KernelCqrsModule {}
