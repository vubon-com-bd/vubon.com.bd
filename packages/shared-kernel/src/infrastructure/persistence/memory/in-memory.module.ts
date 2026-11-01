/**
 * InMemoryModule — Global module marker for in-memory storage
 * @module shared-kernel/infrastructure/persistence/memory
 *
 * This module has no providers — it's a marker used to signal
 * that repositories are backed by in-memory stores.
 */
import { Global, Module } from '@nestjs/common';

@Global()
@Module({})
export class InMemoryModule {}
