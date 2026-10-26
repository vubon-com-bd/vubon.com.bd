import { WebhookPayloadVO } from '@domain/composites/webhook-payload.vo.js';
import { WebhookIdVO } from '@domain/primitives/webhook-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const makeProps = (overrides: any = {}) => ({
  event: 'order.created' as const,
  webhookId: WebhookIdVO.create(IDS.webhookId),
  deliveryId: 'delivery-1',
  payload: { orderId: 'ORD-1234' },
  signature: 'sig-abc',
  timestamp: '2025-01-15T10:00:00.000Z',
  ...overrides,
});

describe('WebhookPayloadVO', () => {
  describe('create()', () => {
    it('creates valid payload', () => {
      const vo = WebhookPayloadVO.create(makeProps());
      expect(vo.deliveryId).toBe('delivery-1');
      expect(vo.event).toBe('order.created');
    });

    it('rejects empty deliveryId', () => {
      expect(() => WebhookPayloadVO.create(makeProps({ deliveryId: '' }))).toThrow(ValidationError);
    });

    it('rejects non-object payload', () => {
      expect(() => WebhookPayloadVO.create(makeProps({ payload: 'string' }))).toThrow(ValidationError);
      expect(() => WebhookPayloadVO.create(makeProps({ payload: [] }))).toThrow(ValidationError);
      expect(() => WebhookPayloadVO.create(makeProps({ payload: null }))).toThrow(ValidationError);
    });

    it('rejects >256KB payload', () => {
      const big = { data: 'a'.repeat(270_000) };
      expect(() =>
        WebhookPayloadVO.create(makeProps({ payload: big })),
      ).toThrow(ValidationError);
    });

    it('rejects empty signature', () => {
      expect(() => WebhookPayloadVO.create(makeProps({ signature: '' }))).toThrow(ValidationError);
    });

    it('rejects invalid timestamp', () => {
      expect(() => WebhookPayloadVO.create(makeProps({ timestamp: 'garbage' }))).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = WebhookPayloadVO.reconstitute(makeProps());
      expect(vo.deliveryId).toBe('delivery-1');
    });
  });

  describe('getters', () => {
    const vo = WebhookPayloadVO.reconstitute(makeProps());
    it('exposes all fields', () => {
      expect(vo.event).toBe('order.created');
      expect(vo.webhookId).toBeDefined();
      expect(vo.deliveryId).toBe('delivery-1');
      expect(vo.payload).toEqual({ orderId: 'ORD-1234' });
      expect(vo.signature).toBe('sig-abc');
      expect(vo.timestamp).toBe('2025-01-15T10:00:00.000Z');
    });

    it('payloadSizeBytes > 0', () => {
      expect(vo.payloadSizeBytes).toBeGreaterThan(0);
    });

    it('payloadKeys', () => {
      expect(vo.payloadKeys).toEqual(['orderId']);
    });
  });
});
