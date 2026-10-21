/**
 * Webhooks E2E — ৮টি gateway contract
 * @module payment-service/test/e2e/interfaces
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { BkashWebhookController } from '@interfaces/controllers/webhooks/bkash.webhook';
import { NagadWebhookController } from '@interfaces/controllers/webhooks/nagad.webhook';
import { StripeWebhookController } from '@interfaces/controllers/webhooks/stripe.webhook';
import { PaypalWebhookController } from '@interfaces/controllers/webhooks/paypal.webhook';
import { SslcommerzWebhookController } from '@interfaces/controllers/webhooks/sslcommerz.webhook';
import { AamarpayWebhookController } from '@interfaces/controllers/webhooks/aamarpay.webhook';
import { RocketWebhookController } from '@interfaces/controllers/webhooks/rocket.webhook';
import { CryptoWebhookController } from '@interfaces/controllers/webhooks/crypto.webhook';
import type { CommandBus } from '@nestjs/cqrs';

describe('Webhooks E2E', () => {
  let commandBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ id: 'p1' })) };
  });

  it('bkash — completed webhook dispatches command', async () => {
    const ctrl = new BkashWebhookController(commandBus as unknown as CommandBus);
    const result = await ctrl.handle(
      {
        paymentID: 'TR001',
        trxID: 'BK123',
        amount: '1500.00',
        transactionStatus: 'Completed',
      },
      { 'x-bkash-signature': 'sig' },
    );
    expect(result).toEqual({ acknowledged: true });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('nagad — success webhook dispatches command', async () => {
    const ctrl = new NagadWebhookController(commandBus as unknown as CommandBus);
    const result = await ctrl.handle(
      {
        orderId: 'o1',
        paymentRefId: 'NG123',
        amount: '500',
        status: 'Success',
      },
      {},
    );
    expect(result).toEqual({ acknowledged: true });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('stripe — payment_intent.succeeded dispatches command', async () => {
    const ctrl = new StripeWebhookController(commandBus as unknown as CommandBus);
    const result = await ctrl.handle(
      {
        id: 'evt_1',
        type: 'payment_intent.succeeded',
        data: { object: { id: 'pi_123' } },
      },
      't=123,v1=abc',
    );
    expect(result).toEqual({ received: true });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('paypal — PAYMENT.CAPTURE.COMPLETED dispatches', async () => {
    const ctrl = new PaypalWebhookController(commandBus as unknown as CommandBus);
    const result = await ctrl.handle(
      {
        id: 'WH-1',
        event_type: 'PAYMENT.CAPTURE.COMPLETED',
        resource: {
          id: 'CAP-1',
          custom_id: 'pay-1',
          amount: { value: '100.00', currency_code: 'USD' },
        },
      },
      {},
    );
    expect(result).toEqual({ received: true });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('paypal — non-matching event is silently skipped', async () => {
    const ctrl = new PaypalWebhookController(commandBus as unknown as CommandBus);
    await ctrl.handle(
      { id: 'WH-2', event_type: 'CUSTOMER.CREATED', resource: {} },
      {},
    );
    expect(commandBus.execute).not.toHaveBeenCalled();
  });

  it('sslcommerz — VALID status dispatches command', async () => {
    const ctrl = new SslcommerzWebhookController(commandBus as unknown as CommandBus);
    const result = await ctrl.handle({
      tran_id: 'TXN-1',
      val_id: 'VAL-1',
      amount: '100',
      status: 'VALID',
    });
    expect(result).toEqual({ acknowledged: true });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('aamarpay — Successful status dispatches command', async () => {
    const ctrl = new AamarpayWebhookController(commandBus as unknown as CommandBus);
    const result = await ctrl.handle({
      mer_txnid: 'M1',
      amount: '100',
      pay_status: 'Successful',
    });
    expect(result).toEqual({ acknowledged: true });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('aamarpay — failed status skipped', async () => {
    const ctrl = new AamarpayWebhookController(commandBus as unknown as CommandBus);
    await ctrl.handle({
      mer_txnid: 'M1',
      amount: '100',
      pay_status: 'Failed',
    });
    expect(commandBus.execute).not.toHaveBeenCalled();
  });

  it('rocket — Success status dispatches command', async () => {
    const ctrl = new RocketWebhookController(commandBus as unknown as CommandBus);
    const result = await ctrl.handle({
      orderId: 'o1',
      rocketPaymentId: 'RCK123',
      amount: '300',
      status: 'Success',
    });
    expect(result).toEqual({ acknowledged: true });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('rocket — non-Success status skipped', async () => {
    const ctrl = new RocketWebhookController(commandBus as unknown as CommandBus);
    await ctrl.handle({
      orderId: 'o1',
      rocketPaymentId: 'RCK123',
      amount: '300',
      status: 'Failed',
    });
    expect(commandBus.execute).not.toHaveBeenCalled();
  });

  it('crypto — confirmed webhook acknowledged', async () => {
    const ctrl = new CryptoWebhookController(commandBus as unknown as CommandBus);
    const result = await ctrl.handle({
      txHash: '0xabc',
      fromAddress: '0xdef',
      amount: '100',
      currency: 'USDT',
      status: 'confirmed',
      confirmations: 6,
    });
    expect(result).toEqual({ acknowledged: true });
  });
});
