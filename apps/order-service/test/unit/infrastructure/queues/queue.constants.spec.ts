/**
 * Queue Constants Tests
 * @module order-service/test/unit/infrastructure/queues
 */
import {
  ORDER_QUEUE_NAME,
  ORDER_JOB_NAME,
  ORDER_QUEUE_LIMITS,
} from '@infrastructure/queues/queue.constants.js';

describe('ORDER_QUEUE_NAME', () => {
  it('should be defined', () => {
    expect(ORDER_QUEUE_NAME).toBeDefined();
  });

  it('should have all required queue names', () => {
    expect(ORDER_QUEUE_NAME.ORDER_PROCESSING).toBeDefined();
    expect(ORDER_QUEUE_NAME.DELIVERY).toBeDefined();
    expect(ORDER_QUEUE_NAME.TRACKING).toBeDefined();
    expect(ORDER_QUEUE_NAME.FULFILLMENT).toBeDefined();
    expect(ORDER_QUEUE_NAME.NOTIFICATION).toBeDefined();
    expect(ORDER_QUEUE_NAME.ANALYTICS).toBeDefined();
    expect(ORDER_QUEUE_NAME.CLEANUP).toBeDefined();
    expect(ORDER_QUEUE_NAME.WEBHOOK).toBeDefined();
  });

  it('should return string values for all queue names', () => {
    Object.values(ORDER_QUEUE_NAME).forEach((name) => {
      expect(typeof name).toBe('string');
      expect(name.length).toBeGreaterThan(0);
    });
  });
});

describe('ORDER_JOB_NAME', () => {
  it('should be defined', () => {
    expect(ORDER_JOB_NAME).toBeDefined();
  });

  it('should contain expected job name strings', () => {
    expect(ORDER_JOB_NAME.PROCESS_ORDER).toBe('process-order');
    expect(ORDER_JOB_NAME.AUTO_CANCEL_ORDER).toBe('auto-cancel-order');
    expect(ORDER_JOB_NAME.SCHEDULE_DELIVERY).toBe('schedule-delivery');
    expect(ORDER_JOB_NAME.TRACK_DELIVERY).toBe('track-delivery');
    expect(ORDER_JOB_NAME.SEND_NOTIFICATION).toBe('send-notification');
    expect(ORDER_JOB_NAME.UPDATE_ANALYTICS).toBe('update-analytics');
  });
});

describe('ORDER_QUEUE_LIMITS', () => {
  it('should have numeric limits', () => {
    expect(ORDER_QUEUE_LIMITS.MAX_ATTEMPTS).toBeGreaterThan(0);
    expect(ORDER_QUEUE_LIMITS.BACKOFF_MS).toBeGreaterThan(0);
    expect(ORDER_QUEUE_LIMITS.CONCURRENCY).toBeGreaterThan(0);
    expect(ORDER_QUEUE_LIMITS.RETRY_DELAY_MS).toBeGreaterThan(0);
  });
});
