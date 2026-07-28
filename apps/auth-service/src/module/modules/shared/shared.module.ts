/**
 * Shared Module
 * Provides global services like Prisma, Redis, etc.
 * Exports these services for use across the application
 */

import { Module, Global } from '@nestjs/common';
import { PrismaModule } from '../../infrastructure/persistence/prisma/prisma.module.js';

@Global()
@Module({
  imports: [
    PrismaModule,
    // RedisModule will be added here when implemented
  ],
  exports: [
    PrismaModule,
    // RedisModule will be exported here when implemented
  ],
})
export class SharedModule {}
