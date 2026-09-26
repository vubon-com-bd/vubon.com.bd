import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ClusterController } from '../../interfaces/controllers/rest/cluster.controller';

import { ClusterPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/cluster.prisma.repository';
import { ClusterResultPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/cluster-result.prisma.repository';

import { ClusterService } from '../../application/services/impl/cluster.service';
import { ClusterResultService } from '../../application/services/impl/cluster-result.service';

import { ClusteringWorker } from '../../infrastructure/workers/clustering.worker';

import { ClusterCommandHandlers } from './commands';
import { ClusterQueryHandlers } from './queries';

@Module({
  imports: [CqrsModule],
  controllers: [ClusterController],
  providers: [
    ClusterPrismaRepository,
    ClusterResultPrismaRepository,
    ClusterService,
    ClusterResultService,
    ClusteringWorker,
    ...ClusterCommandHandlers,
    ...ClusterQueryHandlers,
  ],
  exports: [ClusterService, ClusterResultService],
})
export class ClusterModule {}
