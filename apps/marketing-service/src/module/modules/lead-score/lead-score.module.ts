import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { LeadScoreService } from '../../application/services/impl/lead-score.service';
import { LeadScorePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/lead-score.prisma.repository';
import { GetLeadScoreHandler } from '../../application/queries/lead';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  providers: [
    LeadScoreService,
    { provide: 'LeadScoreRepository', useClass: LeadScorePrismaRepository },
    GetLeadScoreHandler,
  ],
  exports: [LeadScoreService, 'LeadScoreRepository'],
})
export class LeadScoreModule {}
