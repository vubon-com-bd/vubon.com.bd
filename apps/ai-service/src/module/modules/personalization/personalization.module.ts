import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PersonalizationController } from '../../interfaces/controllers/rest/personalization.controller';

import { PersonalizationPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/personalization.prisma.repository';
import { PersonalizationProfilePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/personalization-profile.prisma.repository';
import { PersonalizationCacheRepository } from '../../infrastructure/persistence/cache/repositories/personalization.cache.repository';

import { PersonalizationService } from '../../application/services/impl/personalization.service';
import { PersonalizationProfileService } from '../../application/services/impl/personalization-profile.service';

import { PersonalizationCommandHandlers } from './commands';
import { PersonalizationQueryHandlers } from './queries';

@Module({
  imports: [CqrsModule],
  controllers: [PersonalizationController],
  providers: [
    PersonalizationPrismaRepository,
    PersonalizationProfilePrismaRepository,
    PersonalizationCacheRepository,
    PersonalizationService,
    PersonalizationProfileService,
    ...PersonalizationCommandHandlers,
    ...PersonalizationQueryHandlers,
  ],
  exports: [PersonalizationService, PersonalizationProfileService],
})
export class PersonalizationModule {}
