/**
 * ProductPublishSaga — orchestrates post-publish side effects
 * @module product-service/application/sagas
 *
 * Reacts to:
 *  - ProductCreatedEvent  → index in search, notify vendor
 *  - ProductPublishedEvent → reindex, update analytics
 *  - ProductStatusChangedEvent → analytics, notify vendor
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  ProductCreatedEvent,
  ProductPublishedEvent,
  ProductStatusChangedEvent,
} from '../../domain/events/product.events.js';

import { NotifyVendorCommand } from './commands/notify-vendor.command.js';
import { UpdateSearchIndexCommand } from './commands/update-search-index.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class ProductPublishSaga {
  private readonly logger = new Logger(ProductPublishSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onCreated = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductCreatedEvent),
      tap((e: ProductCreatedEvent) => {
        this.logger.log(`Saga: product created → ${e.payload.productId}`);
      }),
      map((e: ProductCreatedEvent) => {
        // Fire-and-forget analytics
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.productId, 'product.created', {
            name: e.payload.name,
            sku: e.payload.sku,
            categoryId: e.payload.categoryId,
          }),
        );
        // Index in search (draft — not visible yet)
        void this.commandBus.execute(
          new UpdateSearchIndexCommand(e.payload.productId, 'index', {
            sku: e.payload.sku,
            name: e.payload.name,
          }),
        );
        // Notify vendor
        return new NotifyVendorCommand(
          e.payload.vendorId ?? 'system',
          e.payload.productId,
          'product_created',
          { name: e.payload.name },
        );
      }),
    );
  };

  @Saga()
  onPublished = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductPublishedEvent),
      tap((e: ProductPublishedEvent) => {
        this.logger.log(`Saga: product published → ${e.payload.productId}`);
      }),
      map((e: ProductPublishedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.productId, 'product.published', {
            publishedAt: e.payload.publishedAt,
          }),
        );
        // Reindex so it becomes visible
        void this.commandBus.execute(
          new UpdateSearchIndexCommand(e.payload.productId, 'reindex'),
        );
        return new NotifyVendorCommand(
          'system',
          e.payload.productId,
          'product_published',
          { publishedAt: e.payload.publishedAt },
        );
      }),
    );
  };

  @Saga()
  onStatusChanged = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductStatusChangedEvent),
      map((e: ProductStatusChangedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.productId, 'product.status_changed', {
            from: e.payload.fromStatus,
            to: e.payload.toStatus,
          }),
        );
        return new UpdateSearchIndexCommand(
          e.payload.productId,
          e.payload.toStatus === 'deleted' || e.payload.toStatus === 'archived'
            ? 'delete'
            : 'reindex',
        );
      }),
    );
  };
}
