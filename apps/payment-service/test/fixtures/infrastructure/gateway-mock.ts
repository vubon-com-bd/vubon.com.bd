/**
 * Gateway Mock — for gateway adapter tests
 * @module payment-service/test/fixtures/infrastructure
 */
import { jest } from '@jest/globals';
import type { IPaymentGatewayAdapter } from '@infrastructure/gateways/base/gateway.interface';

export function makeMockGatewayAdapter(
  gatewayId = 'mock',
  enabled = true,
): IPaymentGatewayAdapter {
  return {
    gatewayId,
    isEnabled: jest.fn().mockReturnValue(enabled),
    initiate: jest.fn().mockResolvedValue({
      success: true,
      gatewayPaymentId: `${gatewayId}_pi_123`,
      redirectUrl: `https://${gatewayId}.example.com/checkout/123`,
    }),
    verify: jest.fn().mockResolvedValue({
      verified: true,
      gatewayPaymentId: `${gatewayId}_pi_123`,
      amount: 1000,
      currency: 'BDT',
      status: 'succeeded',
    }),
    capture: jest.fn().mockResolvedValue({
      success: true,
      gatewayPaymentId: `${gatewayId}_pi_123`,
      capturedAt: new Date().toISOString(),
    }),
    refund: jest.fn().mockResolvedValue({
      success: true,
      gatewayRefundId: `${gatewayId}_re_123`,
      processedAt: new Date().toISOString(),
    }),
    cancel: jest.fn().mockResolvedValue({ success: true }),
    verifyWebhook: jest.fn().mockReturnValue({
      valid: true,
      eventType: 'payment.succeeded',
      externalId: `${gatewayId}_evt_123`,
    }),
  } as unknown as IPaymentGatewayAdapter;
}
