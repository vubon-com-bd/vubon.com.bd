import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { LeadService } from '../../application/services/impl/lead.service';
import { LeadScoreService } from '../../application/services/impl/lead-score.service';
import { LeadSourceService } from '../../application/services/impl/lead-source.service';

import {
  CreateLeadHandler,
  QualifyLeadHandler,
  ConvertLeadHandler,
  AssignLeadHandler,
} from '../../application/commands/lead';

import {
  GetLeadHandler,
  ListLeadsHandler,
  GetLeadScoreHandler,
} from '../../application/queries/lead';

import { LeadMapper } from '../../application/mappers/lead.mapper';

import { LeadPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/lead.prisma.repository';
import { LeadScorePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/lead-score.prisma.repository';
import { LeadSourcePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/lead-source.prisma.repository';

import { LeadController } from '../../interfaces/controllers/rest/lead.controller';
import { LeadControllerMapper } from '../../interfaces/mappers/lead.controller.mapper';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  controllers: [LeadController],
  providers: [
    LeadService,
    LeadScoreService,
    LeadSourceService,

    { provide: 'LeadRepository', useClass: LeadPrismaRepository },
    { provide: 'LeadScoreRepository', useClass: LeadScorePrismaRepository },
    { provide: 'LeadSourceRepository', useClass: LeadSourcePrismaRepository },

    LeadMapper,
    LeadControllerMapper,

    CreateLeadHandler,
    QualifyLeadHandler,
    ConvertLeadHandler,
    AssignLeadHandler,
    GetLeadHandler,
    ListLeadsHandler,
    GetLeadScoreHandler,
  ],
  exports: [LeadService, 'LeadRepository'],
})
export class LeadModule {}
