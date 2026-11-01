/**
 * VendorOnboardingSaga — orchestrates new vendor onboarding
 * @module vendor-service/application/sagas
 *
 * Reacts to:
 *  - VendorRegisteredEvent  → notify vendor + update analytics + index in search
 *  - VendorApprovedEvent    → notify vendor + index in search
 *  - VendorRejectedEvent    → notify vendor + update analytics
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  VendorRegisteredEvent,
  VendorApprovedEvent,
  VendorRejectedEvent,
  VendorVerifiedEvent,
} from '../../domain/events/vendor.events.js';

import { NotifyVendorRegisteredCommand } from './commands/notify-vendor-registered.command.js';
import { NotifyVendorApprovedCommand } from './commands/notify-vendor-approved.command.js';
import { NotifyVendorRejectedCommand } from './commands/notify-vendor-rejected.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';
import { UpdateSearchIndexCommand } from './commands/update-search-index.command.js';

@Injectable()
export class VendorOnboardingSaga {
  private readonly logger = new Logger(VendorOnboardingSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onRegistered = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorRegisteredEvent),
      tap((e: VendorRegisteredEvent) => {
        this.logger.log(`Saga: vendor registered → ${e.payload.vendorId}`);
      }),
      map((e: VendorRegisteredEvent) => {
        // Fire-and-forget analytics
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'vendor.registered',
            {
              name: e.payload.name,
              slug: e.payload.slug,
              type: e.payload.type,
              businessType: e.payload.businessType,
            },
            e.payload.registeredAt,
          ),
        );

        // Index in search (pending state — not visible yet)
        void this.commandBus.execute(
          new UpdateSearchIndexCommand(e.payload.vendorId, 'index'),
        );

        // Notify vendor (main command returned)
        return new NotifyVendorRegisteredCommand(
          e.payload.vendorId,
          e.payload.userId,
          e.payload.email,
          e.payload.name,
        );
      }),
    );
  };

  @Saga()
  onApproved = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorApprovedEvent),
      tap((e: VendorApprovedEvent) => {
        this.logger.log(`Saga: vendor approved → ${e.payload.vendorId}`);
      }),
      map((e: VendorApprovedEvent) => {
        // Update analytics
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'vendor.approved',
            { approvedBy: e.payload.approvedBy, tier: e.payload.tier },
            e.payload.approvedAt,
          ),
        );

        // Reindex so it may appear in search
        void this.commandBus.execute(
          new UpdateSearchIndexCommand(e.payload.vendorId, 'reindex'),
        );

        // Notify vendor
        return new NotifyVendorApprovedCommand(
          e.payload.vendorId,
          'unknown@vendor.com', // would come from vendor entity in real impl
          e.payload.approvedAt,
        );
      }),
    );
  };

  @Saga()
  onRejected = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorRejectedEvent),
      tap((e: VendorRejectedEvent) => {
        this.logger.log(`Saga: vendor rejected → ${e.payload.vendorId}`);
      }),
      map((e: VendorRejectedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'vendor.rejected',
            { reason: e.payload.reason },
            e.payload.rejectedAt,
          ),
        );
        void this.commandBus.execute(
          new UpdateSearchIndexCommand(e.payload.vendorId, 'delete'),
        );
        return new NotifyVendorRejectedCommand(
          e.payload.vendorId,
          'unknown@vendor.com',
          e.payload.reason,
          e.payload.rejectedAt,
        );
      }),
    );
  };

  @Saga()
  onVerified = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorVerifiedEvent),
      map((e: VendorVerifiedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'vendor.verified',
            {},
            e.payload.verifiedAt,
          ),
        );
        return new UpdateSearchIndexCommand(e.payload.vendorId, 'reindex');
      }),
    );
  };
}
