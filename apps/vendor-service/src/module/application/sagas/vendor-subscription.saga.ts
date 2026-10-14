/**
 * VendorSubscriptionSaga — orchestrates subscription lifecycle side effects
 * @module vendor-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  VendorSubscriptionStartedEvent,
  VendorSubscriptionTrialStartedEvent,
  VendorSubscriptionTrialEndedEvent,
  VendorSubscriptionRenewedEvent,
  VendorSubscriptionUpgradedEvent,
  VendorSubscriptionDowngradedEvent,
  VendorSubscriptionCancelledEvent,
  VendorSubscriptionExpiredEvent,
  VendorSubscriptionFeatureEnabledEvent,
  VendorSubscriptionFeatureDisabledEvent,
} from '../../domain/events/vendor-subscription.events.js';

import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class VendorSubscriptionSaga {
  private readonly logger = new Logger(VendorSubscriptionSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onStarted = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorSubscriptionStartedEvent),
      tap((e: VendorSubscriptionStartedEvent) => {
        this.logger.log(
          `Saga: subscription started → vendor=${e.payload.vendorId} plan=${e.payload.plan}`,
        );
      }),
      map(
        (e: VendorSubscriptionStartedEvent) =>
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'subscription.started',
            {
              subscriptionId: e.payload.subscriptionId,
              plan: e.payload.plan,
              cycle: e.payload.cycle,
              price: e.payload.priceAmount,
            },
            e.payload.startedAt,
          ),
      ),
    );
  };

  @Saga()
  onTrialStarted = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorSubscriptionTrialStartedEvent),
      map(
        (e: VendorSubscriptionTrialStartedEvent) =>
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'subscription.trial_started',
            {
              subscriptionId: e.payload.subscriptionId,
              plan: e.payload.plan,
              trialEndsAt: e.payload.trialEndsAt,
            },
            e.payload.trialStartedAt,
          ),
      ),
    );
  };

  @Saga()
  onTrialEnded = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorSubscriptionTrialEndedEvent),
      map(
        (e: VendorSubscriptionTrialEndedEvent) =>
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'subscription.trial_ended',
            {
              subscriptionId: e.payload.subscriptionId,
              converted: e.payload.converted,
            },
            e.payload.trialEndedAt,
          ),
      ),
    );
  };

  @Saga()
  onRenewed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorSubscriptionRenewedEvent),
      map(
        (e: VendorSubscriptionRenewedEvent) =>
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'subscription.renewed',
            {
              subscriptionId: e.payload.subscriptionId,
              plan: e.payload.plan,
              amount: e.payload.amount,
              newPeriodEnd: e.payload.newPeriodEnd,
            },
            e.payload.renewedAt,
          ),
      ),
    );
  };

  @Saga()
  onUpgraded = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorSubscriptionUpgradedEvent),
      map(
        (e: VendorSubscriptionUpgradedEvent) =>
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'subscription.upgraded',
            {
              subscriptionId: e.payload.subscriptionId,
              fromPlan: e.payload.fromPlan,
              toPlan: e.payload.toPlan,
              newPrice: e.payload.newPrice,
            },
            e.payload.upgradedAt,
          ),
      ),
    );
  };

  @Saga()
  onDowngraded = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorSubscriptionDowngradedEvent),
      map(
        (e: VendorSubscriptionDowngradedEvent) =>
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'subscription.downgraded',
            {
              subscriptionId: e.payload.subscriptionId,
              fromPlan: e.payload.fromPlan,
              toPlan: e.payload.toPlan,
              newPrice: e.payload.newPrice,
            },
            e.payload.downgradedAt,
          ),
      ),
    );
  };

  @Saga()
  onCancelled = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorSubscriptionCancelledEvent),
      map(
        (e: VendorSubscriptionCancelledEvent) =>
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'subscription.cancelled',
            {
              subscriptionId: e.payload.subscriptionId,
              reason: e.payload.reason,
              cancelAtPeriodEnd: e.payload.cancelAtPeriodEnd,
            },
            e.payload.cancelledAt,
          ),
      ),
    );
  };

  @Saga()
  onExpired = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorSubscriptionExpiredEvent),
      map(
        (e: VendorSubscriptionExpiredEvent) =>
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'subscription.expired',
            { subscriptionId: e.payload.subscriptionId },
            e.payload.expiredAt,
          ),
      ),
    );
  };

  @Saga()
  onFeatureEnabled = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorSubscriptionFeatureEnabledEvent),
      map(
        (e: VendorSubscriptionFeatureEnabledEvent) =>
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'subscription.feature_enabled',
            {
              subscriptionId: e.payload.subscriptionId,
              featureKey: e.payload.featureKey,
            },
            e.payload.enabledAt,
          ),
      ),
    );
  };

  @Saga()
  onFeatureDisabled = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorSubscriptionFeatureDisabledEvent),
      map(
        (e: VendorSubscriptionFeatureDisabledEvent) =>
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'subscription.feature_disabled',
            {
              subscriptionId: e.payload.subscriptionId,
              featureKey: e.payload.featureKey,
              reason: e.payload.reason,
            },
            e.payload.disabledAt,
          ),
      ),
    );
  };
}
