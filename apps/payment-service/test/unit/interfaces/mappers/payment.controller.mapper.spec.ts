/**
 * PaymentControllerMapper — unit tests
 * @module payment-service/test/unit/interfaces/mappers
 */
import { describe, it, expect } from '@jest/globals';
import { PaymentControllerMapper } from '@interfaces/mappers/payment.controller.mapper';
import type {
  InitiatePaymentHttpDTO,
  ListPaymentsHttpQueryDTO,
} from '@interfaces/dtos/requests/payment.request.dto';
import type { PaymentResponseDTO } from '@application/dtos/responses/payment-response.dto';

describe('PaymentControllerMapper', () => {
  describe('toInitiateAppDto', () => {
    it('maps HTTP DTO → app DTO', () => {
      const http: InitiatePaymentHttpDTO = {
        orderId: 'a1b2c3d4-e5f6-4789-a012-3456789abcde',
        method: 'card',
        gateway: 'stripe',
        amount: 100,
        currency: 'BDT',
        returnUrl: 'https://example.com/cb',
        metadata: { src: 'web' },
      };
      const app = PaymentControllerMapper.toInitiateAppDto(http);

      expect(app.orderId).toBe(http.orderId);
      expect(app.method).toBe(http.method);
      expect(app.gateway).toBe(http.gateway);
      expect(app.amount).toBe(100);
      expect(app.currency).toBe('BDT');
      expect(app.returnUrl).toBe(http.returnUrl);
      expect(app.metadata).toEqual({ src: 'web' });
    });
  });

  describe('toListOptions', () => {
    it('applies defaults for pagination', () => {
      const query: ListPaymentsHttpQueryDTO = {};
      const options = PaymentControllerMapper.toListOptions(query);
      expect(options.page).toBe(1);
      expect(options.limit).toBe(20);
      expect(options.sortBy).toBe('createdAt');
      expect(options.sortDir).toBe('desc');
    });

    it('passes filters through', () => {
      const query: ListPaymentsHttpQueryDTO = {
        page: 2,
        limit: 50,
        status: 'paid',
        method: 'card',
        gateway: 'stripe',
        fromDate: '2024-01-01',
        toDate: '2024-12-31',
      };
      const options = PaymentControllerMapper.toListOptions(query);
      expect(options.page).toBe(2);
      expect(options.limit).toBe(50);
      expect(options.filter?.status).toBe('paid');
      expect(options.filter?.method).toBe('card');
      expect(options.filter?.gateway).toBe('stripe');
      expect(options.filter?.fromDate).toBe('2024-01-01');
    });
  });

  describe('toHttpResponse', () => {
    it('maps full app DTO → HTTP DTO', () => {
      const app: PaymentResponseDTO = {
        id: 'pay-1',
        orderId: 'ord-1',
        userId: 'usr-1',
        status: 'paid' as never,
        method: 'card' as never,
        gateway: 'stripe' as never,
        amount: 500,
        currency: 'BDT',
        gatewayReference: 'pi_123',
        refundedAmount: undefined,
        failureReason: undefined,
        failureCode: undefined,
        authorizedAt: undefined,
        capturedAt: '2024-01-01T00:00:00Z',
        paidAt: '2024-01-01T00:05:00Z',
        metadata: { k: 'v' },
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:05:00Z',
      };
      const http = PaymentControllerMapper.toHttpResponse(app);

      expect(http.id).toBe('pay-1');
      expect(http.status).toBe('paid');
      expect(http.amount).toBe(500);
      expect(http.gatewayReference).toBe('pi_123');
      expect(http.metadata).toEqual({ k: 'v' });
    });
  });
});

// ─── Additional coverage for remaining methods ───
describe('PaymentControllerMapper — additional coverage', () => {
  describe('toPublicHttpResponse', () => {
    it('maps public DTO', () => {
      const app = {
        id: 'p1',
        orderId: 'o1',
        status: 'paid' as never,
        method: 'card' as never,
        amount: 100,
        currency: 'BDT',
        refundedAmount: 20,
        createdAt: '2024-01-01',
        capturedAt: '2024-01-02',
      };
      const http = PaymentControllerMapper.toPublicHttpResponse(app);
      expect(http.id).toBe('p1');
      expect(http.refundedAmount).toBe(20);
    });

    it('maps public DTO with undefined optional fields', () => {
      const app = {
        id: 'p1',
        orderId: 'o1',
        status: 'pending' as never,
        method: 'card' as never,
        amount: 100,
        currency: 'BDT',
        refundedAmount: undefined,
        createdAt: '2024-01-01',
        capturedAt: undefined,
      };
      const http = PaymentControllerMapper.toPublicHttpResponse(app);
      expect(http.capturedAt).toBeUndefined();
    });
  });

  describe('toSummaryHttp', () => {
    it('maps summary', () => {
      const app = {
        id: 'p1',
        orderId: 'o1',
        status: 'paid' as never,
        amount: 100,
        currency: 'BDT',
        createdAt: '2024-01-01',
      };
      const http = PaymentControllerMapper.toSummaryHttp(app);
      expect(http.id).toBe('p1');
    });
  });

  describe('toListHttp', () => {
    it('maps list with items', () => {
      const app = {
        items: [
          {
            id: 'p1',
            orderId: 'o1',
            status: 'paid' as never,
            amount: 100,
            currency: 'BDT',
            createdAt: '2024-01-01',
          },
        ],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      };
      const http = PaymentControllerMapper.toListHttp(app);
      expect(http.items).toHaveLength(1);
      expect(http.total).toBe(1);
    });

    it('maps empty list', () => {
      const app = {
        items: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      };
      const http = PaymentControllerMapper.toListHttp(app);
      expect(http.items).toHaveLength(0);
    });
  });

  describe('toStatsHttp', () => {
    it('maps stats', () => {
      const app = {
        total: 10,
        totalAmount: 5000,
        averageAmount: 500,
        currency: 'BDT',
        byStatus: { paid: 5, pending: 5 },
        byMethod: { card: 8, cod: 2 },
      };
      const http = PaymentControllerMapper.toStatsHttp(app);
      expect(http.total).toBe(10);
      expect(http.averageAmount).toBe(500);
    });
  });
});
