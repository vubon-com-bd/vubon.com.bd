import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CheckoutSessionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/checkout-session.prisma.repository';

@Module({
  imports: [CqrsModule],
  providers: [CheckoutSessionPrismaRepository],
  exports: [CheckoutSessionPrismaRepository],
})
export class CheckoutSessionModule {}
