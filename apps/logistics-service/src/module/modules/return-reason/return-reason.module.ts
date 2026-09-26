import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ReturnReasonController } from '../../interfaces/controllers/rest/return-reason.controller';
import { ReturnReasonService } from '../../application/services/impl/return-reason.service';
import { ReturnReasonPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/return-reason.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [ReturnReasonController],
  providers: [ReturnReasonPrismaRepository, ReturnReasonService],
  exports: [ReturnReasonService, ReturnReasonPrismaRepository],
})
export class ReturnReasonModule {}
