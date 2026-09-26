import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SubscriptionController } from '../../interfaces/controllers/rest/subscription.controller';
import { SubscriptionService } from '../../application/services/impl/subscription.service';
import { SubscriptionMapper } from '../../application/mappers/subscription.mapper';
import { CreateSubscriptionHandler } from '../../application/commands/subscription/create-subscription.handler';
import { UpgradeSubscriptionHandler } from '../../application/commands/subscription/upgrade-subscription.handler';
import { DowngradeSubscriptionHandler } from '../../application/commands/subscription/downgrade-subscription.handler';
import { PauseSubscriptionHandler } from '../../application/commands/subscription/pause-subscription.handler';
import { CancelSubscriptionHandler } from '../../application/commands/subscription/cancel-subscription.handler';
import { ListSubscriptionsHandler } from '../../application/queries/subscription/list-subscriptions.handler';
import { GetSubscriptionHandler } from '../../application/queries/subscription/get-subscription.handler';
import { SubscriptionRenewalSaga } from '../../application/sagas/subscription-renewal.saga';

@Module({
  imports: [CqrsModule],
  controllers: [SubscriptionController],
  providers: [
    SubscriptionService,
    SubscriptionMapper,
    CreateSubscriptionHandler,
    UpgradeSubscriptionHandler,
    DowngradeSubscriptionHandler,
    PauseSubscriptionHandler,
    CancelSubscriptionHandler,
    ListSubscriptionsHandler,
    GetSubscriptionHandler,
    SubscriptionRenewalSaga,
  ],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
