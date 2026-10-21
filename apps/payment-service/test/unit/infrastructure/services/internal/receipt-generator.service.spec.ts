/**
 * ReceiptGeneratorService — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { ReceiptGeneratorService } from '@infrastructure/services/internal/receipt-generator.service';

const DATA = {
  paymentId: 'pay-1',
  orderId: 'ord-1',
  userId: 'usr-1',
  amount: 1000,
  currency: 'BDT',
  method: 'card',
  gateway: 'stripe',
  gatewayReference: 'pi_123',
  paidAt: '2025-01-15T10:00:00.000Z',
};

describe('ReceiptGeneratorService', () => {
  let service: ReceiptGeneratorService;

  beforeEach(() => {
    service = new ReceiptGeneratorService();
  });

  describe('renderText()', () => {
    it('includes all key fields', () => {
      const text = service.renderText(DATA);
      expect(text).toContain('pay-1');
      expect(text).toContain('ord-1');
      expect(text).toContain('usr-1');
      expect(text).toContain('1000.00 BDT');
      expect(text).toContain('card (stripe)');
      expect(text).toContain('pi_123');
    });

    it('handles missing gatewayReference', () => {
      const text = service.renderText({ ...DATA, gatewayReference: undefined });
      expect(text).toContain('N/A');
    });

    it('handles missing gateway', () => {
      const text = service.renderText({ ...DATA, gateway: undefined });
      expect(text).toContain('card');
      expect(text).not.toContain('(stripe)');
    });
  });

  describe('renderHtml()', () => {
    it('renders payment id + order id + amount', () => {
      const html = service.renderHtml(DATA);
      expect(html).toContain('pay-1');
      expect(html).toContain('ord-1');
      expect(html).toContain('1000.00');
      expect(html).toContain('BDT');
    });
  });
});
