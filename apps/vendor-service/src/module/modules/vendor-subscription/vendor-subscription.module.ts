import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorSubscriptionController } from '../../interfaces/controllers/rest/vendor-subscription.controller';
import { CreateSubscriptionHandler } from '../../application/commands/subscription';
import { UpgradeSubscriptionHandler } from '../../application/commands/subscription';
import { DowngradeSubscriptionHandler } from '../../application/commands/subscription';
import { CancelSubscriptionHandler } from '../../application/commands/subscription';
import { GetSubscriptionHandler } from '../../application/queries/subscription';
import { ListPlansHandler } from '../../application/queries/subscription';
import { VendorSubscriptionSaga } from '../../application/sagas/vendor-subscription.saga';
import { VendorSubscriptionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor-subscription.prisma.repository';
import { SubscriptionCacheRepository } from '../../infrastructure/persistence/cache/repositories/subscription.cache.repository';

@Module({
  imports: [CqrsModule],
  controllers: [VendorSubscriptionController],
  providers: [
    VendorSubscriptionPrismaRepository,
    SubscriptionCacheRepository,
    CreateSubscriptionHandler,
    UpgradeSubscriptionHandler,
    DowngradeSubscriptionHandler,
    CancelSubscriptionHandler,
    GetSubscriptionHandler,
    ListPlansHandler,
    VendorSubscriptionSaga,
  ],
  exports: [VendorSubscriptionPrismaRepository],
})
export class VendorSubscriptionModule {}
