import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { FeatureController } from '../../interfaces/controllers/rest/feature.controller';
import { FeaturePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/feature.prisma.repository';
import { FeatureFlagPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/feature-flag.prisma.repository';
import { FeatureService } from '../../application/services/impl/feature.service';
import { FeatureFlagService } from '../../application/services/impl/feature-flag.service';

@Module({
  imports: [CqrsModule],
  controllers: [FeatureController],
  providers: [
    FeaturePrismaRepository,
    FeatureFlagPrismaRepository,
    FeatureService,
    FeatureFlagService,
  ],
  exports: [FeatureService, FeatureFlagService],
})
export class FeatureModule {}
