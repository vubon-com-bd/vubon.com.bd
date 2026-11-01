/**
 * Payment Prisma Module
 * @module payment-service/infrastructure/persistence/prisma
 *
 * Registers PaymentPrismaService globally so all repositories inject it
 * without re-importing.
 */
import { Global, Module } from '@nestjs/common';
import { PaymentPrismaService } from './prisma.service.js';

@Global()
@Module({
  providers: [PaymentPrismaService],
  exports: [PaymentPrismaService],
})
export class PaymentPrismaModule {}
