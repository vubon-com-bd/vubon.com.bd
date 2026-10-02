/**
 * Application Sagas — instantiation + observable behavior
 */
import { firstValueFrom, of, take } from 'rxjs';
import { ProductPublishSaga } from '../../../src/module/application/sagas/product-publish.saga.js';
import { StockAlertSaga } from '../../../src/module/application/sagas/stock-alert.saga.js';
import { ReviewModerationSaga } from '../../../src/module/application/sagas/review-moderation.saga.js';
import { ProductPublishedEvent } from '../../../src/module/domain/events/product.events.js';
import { LowStockAlertEvent, OutOfStockAlertEvent } from '../../../src/module/domain/events/inventory.events.js';
import { ReviewReportedEvent } from '../../../src/module/domain/events/review.events.js';
import { NOW, PRODUCT_ID, USER_ID } from '../../helpers.js';

describe('Application Sagas', () => {
  describe('ProductPublishSaga', () => {
    it('should instantiate', () => {
      expect(new ProductPublishSaga()).toBeDefined();
    });

    it('onPublished returns an observable', () => {
      const saga = new ProductPublishSaga();
      const obs = saga.onPublished(of());
      expect(obs).toBeDefined();
      expect(typeof obs.subscribe).toBe('function');
    });

    it('onPublished emits null for matching event', async () => {
      const saga = new ProductPublishSaga();
      const event = new ProductPublishedEvent({
        aggregateId: PRODUCT_ID,
        payload: {
          productId: PRODUCT_ID,
          publishedAt: NOW,
          publishedBy: USER_ID,
        },
      });

      const result = await firstValueFrom(
        saga.onPublished(of(event)).pipe(take(1)),
      );
      expect(result).toBeNull();
    });
  });

  describe('StockAlertSaga', () => {
    it('should instantiate', () => {
      expect(new StockAlertSaga()).toBeDefined();
    });

    it('onLowStock returns an observable', () => {
      const saga = new StockAlertSaga();
      expect(saga.onLowStock(of())).toBeDefined();
    });

    it('onLowStock emits null for LowStockAlertEvent', async () => {
      const saga = new StockAlertSaga();
      const event = new LowStockAlertEvent({
        aggregateId: 'inv-1',
        payload: {
          inventoryId: 'inv-1',
          productId: PRODUCT_ID,
          currentStock: 3,
          threshold: 10,
        },
      });

      const result = await firstValueFrom(
        saga.onLowStock(of(event)).pipe(take(1)),
      );
      expect(result).toBeNull();
    });

    it('onOutOfStock emits null for OutOfStockAlertEvent', async () => {
      const saga = new StockAlertSaga();
      const event = new OutOfStockAlertEvent({
        aggregateId: 'inv-1',
        payload: {
          inventoryId: 'inv-1',
          productId: PRODUCT_ID,
          lastQuantity: 0,
        },
      });

      const result = await firstValueFrom(
        saga.onOutOfStock(of(event)).pipe(take(1)),
      );
      expect(result).toBeNull();
    });
  });

  describe('ReviewModerationSaga', () => {
    it('should instantiate', () => {
      expect(new ReviewModerationSaga()).toBeDefined();
    });

    it('onReported returns an observable', () => {
      const saga = new ReviewModerationSaga();
      expect(saga.onReported(of())).toBeDefined();
    });

    it('onReported emits null for ReviewReportedEvent', async () => {
      const saga = new ReviewModerationSaga();
      const event = new ReviewReportedEvent({
        aggregateId: 'rev-1',
        payload: {
          reviewId: 'rev-1',
          productId: PRODUCT_ID,
          reportedBy: USER_ID,
          reason: 'spam',
          reportCount: 6,
        },
      });

      const result = await firstValueFrom(
        saga.onReported(of(event)).pipe(take(1)),
      );
      expect(result).toBeNull();
    });
  });
});
