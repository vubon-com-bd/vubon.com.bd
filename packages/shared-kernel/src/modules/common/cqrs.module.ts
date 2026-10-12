/**
 * CQRS Module (kernel wrapper)
 * @module shared-kernel/modules/common
 *
 * Wraps @nestjs/cqrs. NOTE: CqrsModule must be imported by consumers directly
 * via `@nestjs/cqrs` because it requires internal ModuleRef injection
 * that doesn't propagate through a @Global() wrapper.
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

/**
 * Deprecated: kept for backwards compatibility.
 * Consumers should import CqrsModule from '@nestjs/cqrs' directly.
 */
@Module({
  imports: [CqrsModule],
  exports: [CqrsModule],
})
export class KernelCqrsModule {}
