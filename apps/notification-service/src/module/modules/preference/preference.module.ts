import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PreferenceController } from '../../interfaces/controllers/rest/preference.controller';

// Services
import { PreferenceService } from '../../application/services/impl/preference.service';
import { PreferenceMatrixService } from '../../application/services/impl/preference-matrix.service';
import { UnsubscribeTokenService } from '../../infrastructure/services/internal';

// Repositories
import { PreferencePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/preference.prisma.repository';
import { PreferenceMatrixPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/preference-matrix.prisma.repository';
import { PreferenceCacheRepository } from '../../infrastructure/persistence/cache/repositories/preference.cache.repository';

// Sagas
import {
  UnsubscribeSaga,
  BounceHandlingSaga,
} from '../../application/sagas';

// Command handlers
import {
  UpdatePreferenceHandler,
  BulkUpdatePreferenceHandler,
  UnsubscribeHandler,
} from '../../application/commands/preference';

// Query handlers
import {
  GetPreferenceHandler,
  GetPreferenceMatrixHandler,
} from '../../application/queries/preference';

@Module({
  imports: [CqrsModule],
  controllers: [PreferenceController],
  providers: [
    // Repositories
    PreferencePrismaRepository,
    PreferenceMatrixPrismaRepository,
    PreferenceCacheRepository,

    // Services
    PreferenceService,
    PreferenceMatrixService,
    UnsubscribeTokenService,

    // Sagas
    UnsubscribeSaga,
    BounceHandlingSaga,

    // Command handlers
    UpdatePreferenceHandler,
    BulkUpdatePreferenceHandler,
    UnsubscribeHandler,

    // Query handlers
    GetPreferenceHandler,
    GetPreferenceMatrixHandler,
  ],
  exports: [
    PreferenceService,
    PreferenceMatrixService,
    PreferencePrismaRepository,
    PreferenceCacheRepository,
    UnsubscribeTokenService,
  ],
})
export class PreferenceModule {}
