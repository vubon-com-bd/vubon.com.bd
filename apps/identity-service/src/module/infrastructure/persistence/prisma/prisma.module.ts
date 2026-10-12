/**
 * Auth Prisma Module
 * @module identity-service/infrastructure/persistence/prisma
 */
import { Global, Module } from '@nestjs/common';
import { AuthPrismaService } from './prisma.service.js';

@Global()
@Module({
  providers: [AuthPrismaService],
  exports: [AuthPrismaService],
})
export class AuthPrismaModule {}
