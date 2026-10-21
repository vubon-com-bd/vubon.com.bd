/**
 * WebhookEventPrismaMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  WebhookEventPrismaMapper,
  type PrismaWebhookEventRow,
  type WebhookEventRecord,
} from '@infrastructure/mappers/webhook-event.prisma.mapper';

const ROW: PrismaWebhookEventRow = {
  id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
  paymentId: '11111111-1111-4111-8111-111111111111',
  provider: 'stripe',
  eventType: 'payment_intent.succeeded',
  externalId: 'evt_123',
  signature: 'sig_abc',
  payload: { raw: true },
  status: 'processed',
  processedAt: new Date('2025-01-15T10:00:00.000Z'),
  failureReason: null,
  createdAt: new Date('2025-01-15T10:00:00.000Z'),
  updatedAt: new Date('2025-01-15T10:00:00.000Z'),
  deletedAt: null,
};

describe('WebhookEventPrismaMapper', () => {
  it('maps a processed webhook event', () => {
    const record = WebhookEventPrismaMapper.toRecord(ROW);
    expect(record.id).toBe(ROW.id);
    expect(record.paymentId).toBe(ROW.paymentId);
    expect(record.provider).toBe('stripe');
    expect(record.eventType).toBe('payment_intent.succeeded');
    expect(record.externalId).toBe('evt_123');
    expect(record.signature).toBe('sig_abc');
    expect(record.status).toBe('processed');
    expect(record.processedAt).toBe('2025-01-15T10:00:00.000Z');
    expect(record.payload).toEqual({ raw: true });
  });

  it('handles null paymentId', () => {
    const record = WebhookEventPrismaMapper.toRecord({ ...ROW, paymentId: null });
    expect(record.paymentId).toBeNull();
  });

  it('handles empty payload', () => {
    const record = WebhookEventPrismaMapper.toRecord({ ...ROW, payload: null });
    expect(record.payload).toEqual({});
  });

  it('round-trips via toPersistence', () => {
    const record = WebhookEventPrismaMapper.toRecord(ROW);
    const data = WebhookEventPrismaMapper.toPersistence(record);
    expect(data['provider']).toBe('stripe');
    expect(data['eventType']).toBe('payment_intent.succeeded');
    expect(data['externalId']).toBe('evt_123');
    expect(data['status']).toBe('processed');
  });

  it('exports WebhookEventRecord type', () => {
    const _check: WebhookEventRecord = WebhookEventPrismaMapper.toRecord(ROW);
    expect(_check).toBeDefined();
  });
});
