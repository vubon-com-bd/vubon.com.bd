import { PaymentGatewayService } from '../../../../../src/module/infrastructure/services/external/payment-gateway.service.js';

describe('PaymentGatewayService', () => {
  let service: PaymentGatewayService;

  beforeEach(() => {
    service = new PaymentGatewayService();
  });

  it('charge() returns success with transactionId', async () => {
    const result = await service.charge('order-1', 500, 'BDT');
    expect(result.success).toBe(true);
    expect(result.transactionId).toBeTruthy();
    expect(result.failureReason).toBeUndefined();
  });

  it('charge() transactionId unique per call', async () => {
    const a = await service.charge('o1', 100, 'BDT');
    const b = await service.charge('o2', 100, 'BDT');
    expect(a.transactionId).not.toBe(b.transactionId);
  });

  it('refund() returns success with refundId', async () => {
    const result = await service.refund('order-1', 500, 'BDT', 'customer_request');
    expect(result.success).toBe(true);
    expect(result.refundId).toBeTruthy();
  });
});
