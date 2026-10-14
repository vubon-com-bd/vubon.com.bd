/**
 * VendorPayoutSaga — orchestrates payout lifecycle side effects
 * @module vendor-service/application/sagas
 *
 * Reacts to:
 *  - VendorPayoutRequestedEvent  → notify + analytics
 *  - VendorPayoutApprovedEvent   → notify + analytics
 *  - VendorPayoutPaidEvent       → notify + analytics + settlement reconciliation
 *  - VendorPayoutFailedEvent     → notify + alert analytics
 *  - VendorPayoutRejectedEvent   → notify + analytics
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  VendorPayoutRequestedEvent,
  VendorPayoutApprovedEvent,
  VendorPayoutPaidEvent,
  VendorPayoutFailedEvent,
  VendorPayoutRejectedEvent,
} from '../../domain/events/vendor-payout.events.js';

import { NotifyPayoutProcessedCommand } from './commands/notify-payout-processed.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class VendorPayoutSaga {
  private readonly logger = new Logger(VendorPayoutSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onRequested = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorPayoutRequestedEvent),
      tap((e: VendorPayoutRequestedEvent) => {
        this.logger.log(
          `Saga: payout requested → ${e.payload.payoutId} (${e.payload.amount} ${e.payload.currency})`,
        );
      }),
      map((e: VendorPayoutRequestedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'payout.requested',
            {
              payoutId: e.payload.payoutId,
              amount: e.payload.amount,
              method: e.payload.method,
            },
            e.payload.requestedAt,
          ),
        );
        return new NotifyPayoutProcessedCommand(
          e.payload.payoutId,
          e.payload.vendorId,
          e.payload.amount,
          e.payload.currency,
          'pending',
          e.payload.requestedAt,
        );
      }),
    );
  };

  @Saga()
  onApproved = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorPayoutApprovedEvent),
      map((e: VendorPayoutApprovedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'payout.approved',
            { payoutId: e.payload.payoutId, approvedBy: e.payload.approvedBy },
            e.payload.approvedAt,
          ),
        );
        return new NotifyPayoutProcessedCommand(
          e.payload.payoutId,
          e.payload.vendorId,
          0,
          'BDT',
          'approved',
          e.payload.approvedAt,
        );
      }),
    );
  };

  @Saga()
  onPaid = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorPayoutPaidEvent),
      tap((e: VendorPayoutPaidEvent) => {
        this.logger.log(
          `Saga: payout paid → ${e.payload.payoutId} txn=${e.payload.transactionId}`,
        );
      }),
      map((e: VendorPayoutPaidEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'payout.paid',
            {
              payoutId: e.payload.payoutId,
              transactionId: e.payload.transactionId,
              amount: e.payload.amount,
            },
            e.payload.paidAt,
          ),
        );
        return new NotifyPayoutProcessedCommand(
          e.payload.payoutId,
          e.payload.vendorId,
          e.payload.amount,
          'BDT',
          'paid',
          e.payload.paidAt,
        );
      }),
    );
  };

  @Saga()
  onFailed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorPayoutFailedEvent),
      map((e: VendorPayoutFailedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'payout.failed',
            { payoutId: e.payload.payoutId, reason: e.payload.reason },
            e.payload.failedAt,
          ),
        );
        return new NotifyPayoutProcessedCommand(
          e.payload.payoutId,
          e.payload.vendorId,
          0,
          'BDT',
          'failed',
          e.payload.failedAt,
        );
      }),
    );
  };

  @Saga()
  onRejected = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorPayoutRejectedEvent),
      map((e: VendorPayoutRejectedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'payout.rejected',
            { payoutId: e.payload.payoutId, reason: e.payload.reason },
            e.payload.rejectedAt,
          ),
        );
        return new NotifyPayoutProcessedCommand(
          e.payload.payoutId,
          e.payload.vendorId,
          0,
          'BDT',
          'rejected',
          e.payload.rejectedAt,
        );
      }),
    );
  };
}
