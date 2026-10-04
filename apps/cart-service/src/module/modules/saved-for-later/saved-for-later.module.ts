import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RedisRepositoriesModule } from '../../infrastructure/persistence/redis/redis-repositories.module.js';
import { PrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/prisma-repositories.module.js';
import { SavedForLaterController } from '../../interfaces/controllers/rest/saved-for-later.controller.js';
import { SavedForLaterService } from '../../application/services/impl/saved-for-later.service.js';
import { SAVED_FOR_LATER_SERVICE } from '../../application/services/interfaces/saved-for-later.service.interface.js';
import { SAVED_COMMAND_HANDLERS } from '../../application/commands/saved/index.js';
import { SAVED_QUERY_HANDLERS } from '../../application/queries/saved/index.js';

@Module({
  imports: [CqrsModule, RedisRepositoriesModule, PrismaRepositoriesModule],
  controllers: [SavedForLaterController],
  providers: [
    SavedForLaterService,
    { provide: SAVED_FOR_LATER_SERVICE, useExisting: SavedForLaterService },
    ...SAVED_COMMAND_HANDLERS,
    ...SAVED_QUERY_HANDLERS,
  ],
  exports: [SavedForLaterService, SAVED_FOR_LATER_SERVICE],
})
export class SavedForLaterModule {}
