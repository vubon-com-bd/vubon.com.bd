import { RefundEntity } from '../../../../src/module/domain/entities/refund.entity.js';
import { TransactionEntity } from '../../../../src/module/domain/entities/transaction.entity.js';
import { WebhookEventEntity } from '../../../../src/module/domain/entities/webhook-event.entity.js';
import { PaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { RefundReasonVO } from '../../../../src/module/domain/value-objects/primitives/refund-reason.vo.js';
import { TransactionTypeVO } from '../../../../src/module/domain/value-objects/primitives/transaction-type.vo.js';
import { TransactionReferenceVO } from '../../../../src/module/domain/value-objects/primitives/transaction-reference.vo.js';
import { FailureReasonVO } from '../../../../src/module/domain/value-objects/primitives/failure-reason.vo.js';
import { FailureCodeVO } from '../../../../src/module/domain/value-objects/primitives/failure-code.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { PaymentIdVO as Pid } from '../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { GatewaySignatureVO } from '../../../../src/module/domain/value-objects/primitives/gateway-signature.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

describe('RefundEntity — full branches', () => {
  it('approve with approvedBy', () => {
    const r = RefundEntity.request({
      id: UUID,
      now: NOW,
      props: {
        paymentId: PaymentIdVO.create(UUID),
        amount: 500,
        currency: 'BDT',
      },
    });
    r.approve(UserIdVO.create(UUID));
    expect(r.approvedBy).toBeDefined();
  });

  it('approve without approvedBy', () => {
    const r = RefundEntity.request({
      id: UUID,
      now: NOW,
      props: {
        paymentId: PaymentIdVO.create(UUID),
        amount: 500,
        currency: 'BDT',
      },
    });
    r.approve();
    expect(r.isPending()).toBe(true);
  });

  it('approve throws when not pending', () => {
    const r = RefundEntity.request({
      id: UUID,
      now: NOW,
      props: {
        paymentId: PaymentIdVO.create(UUID),
        amount: 500,
        currency: 'BDT',
      },
    });
    r.startProcessing();
    expect(() => r.approve()).toThrow();
  });

  it('succeed with gatewayRefundId', () => {
    const r = RefundEntity.request({
      id: UUID,
      now: NOW,
      props: {
        paymentId: PaymentIdVO.create(UUID),
        amount: 500,
        currency: 'BDT',
      },
    });
    r.startProcessing();
    r.succeed('gw_rf_1');
    expect(r.gatewayRefundId).toBe('gw_rf_1');
  });

  it('fail with code', () => {
    const r = RefundEntity.request({
      id: UUID,
      now: NOW,
      props: {
        paymentId: PaymentIdVO.create(UUID),
        amount: 500,
        currency: 'BDT',
      },
    });
    r.fail(FailureReasonVO.create('x'), FailureCodeVO.create('ERR'));
    expect(r.failureCode?.value).toBe('ERR');
  });

  it('cancel with reason', () => {
    const r = RefundEntity.request({
      id: UUID,
      now: NOW,
      props: {
        paymentId: PaymentIdVO.create(UUID),
        amount: 500,
        currency: 'BDT',
      },
    });
    r.cancel('user withdraw');
    expect(r.isCancelled()).toBe(true);
  });

  it('reconstitute with version', () => {
    const r = RefundEntity.request({
      id: UUID,
      now: NOW,
      props: {
        paymentId: PaymentIdVO.create(UUID),
        amount: 500,
        currency: 'BDT',
      },
    });
    const recon = RefundEntity.reconstitute({
      id: r.id,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      props: {
        paymentId: r.paymentId,
        status: r.status,
        amount: r.amount,
        currency: r.currency,
      },
      version: 3,
    });
    expect(recon.version).toBe(3);
  });

  it('reconstitute with deletedAt + reason', () => {
    const r = RefundEntity.request({
      id: UUID,
      now: NOW,
      props: {
        paymentId: PaymentIdVO.create(UUID),
        amount: 500,
        currency: 'BDT',
        reason: RefundReasonVO.create('test'),
      },
    });
    const recon = RefundEntity.reconstitute({
      id: r.id,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      deletedAt: NOW,
      props: {
        paymentId: r.paymentId,
        status: r.status,
        amount: r.amount,
        currency: r.currency,
        reason: r.reason,
      },
    });
    expect(recon.deletedAt).toBeDefined();
  });
});

describe('TransactionEntity — full branches', () => {
  it('markSucceeded without gatewayTransactionId', () => {
    const tx = TransactionEntity.create({
      id: UUID,
      now: NOW,
      props: {
        paymentId: Pid.create(UUID),
        type: TransactionTypeVO.create('payment'),
        amount: 1000,
        currency: 'BDT',
      },
    });
    tx.markSucceeded();
    expect(tx.isSuccess()).toBe(true);
  });

  it('markFailed with error code', () => {
    const tx = TransactionEntity.create({
      id: UUID,
      now: NOW,
      props: {
        paymentId: Pid.create(UUID),
        type: TransactionTypeVO.create('payment'),
        amount: 1000,
        currency: 'BDT',
      },
    });
    tx.markFailed(FailureReasonVO.create('x'), FailureCodeVO.create('E'));
    expect(tx.errorCode?.value).toBe('E');
  });

  it('cancel without reason', () => {
    const tx = TransactionEntity.create({
      id: UUID,
      now: NOW,
      props: {
        paymentId: Pid.create(UUID),
        type: TransactionTypeVO.create('payment'),
        amount: 1000,
        currency: 'BDT',
      },
    });
    tx.cancel();
    expect(tx.status.value).toBe('cancelled');
  });

  it('reverse without reversedBy', () => {
    const tx = TransactionEntity.create({
      id: UUID,
      now: NOW,
      props: {
        paymentId: Pid.create(UUID),
        type: TransactionTypeVO.create('payment'),
        amount: 1000,
        currency: 'BDT',
      },
    });
    tx.markSucceeded();
    tx.reverse();
    expect(tx.isReversed()).toBe(true);
  });

  it('create with all optional fields', () => {
    const tx = TransactionEntity.create({
      id: UUID,
      now: NOW,
      props: {
        paymentId: Pid.create(UUID),
        orderId: { value: UUID } as never,
        userId: { value: UUID } as never,
        type: TransactionTypeVO.create('payment'),
        amount: 1000,
        currency: 'BDT',
        gateway: 'bkash',
        gatewayTransactionId: 'gw_tx',
        reference: TransactionReferenceVO.create('ref-1'),
        idempotencyKey: 'idem_abc12345',
        metadata: { k: 'v' },
      },
    });
    expect(tx.gateway).toBe('bkash');
    expect(tx.reference?.value).toBe('ref-1');
    expect(tx.metadata).toEqual({ k: 'v' });
  });

  it('reconstitute with all optional fields', () => {
    const tx = TransactionEntity.create({
      id: UUID,
      now: NOW,
      props: {
        paymentId: Pid.create(UUID),
        type: TransactionTypeVO.create('payment'),
        amount: 1000,
        currency: 'BDT',
      },
    });
    const recon = TransactionEntity.reconstitute({
      id: tx.id,
      createdAt: tx.createdAt,
      updatedAt: tx.updatedAt,
      deletedAt: NOW,
      props: {
        paymentId: tx.paymentId,
        type: tx.type,
        status: tx.status,
        amount: tx.amount,
        currency: tx.currency,
      },
      version: 2,
    });
    expect(recon.version).toBe(2);
    expect(recon.deletedAt).toBeDefined();
  });
});

describe('WebhookEventEntity — full branches', () => {
  it('receive with signature', () => {
    const e = WebhookEventEntity.receive({
      id: UUID,
      now: NOW,
      props: {
        gateway: 'bkash',
        gatewayEventId: 'evt_1',
        eventType: 'x',
        payload: { p: 1 },
        signature: GatewaySignatureVO.create('sig_abc123'),
      },
    });
    expect(e.signature?.value).toBe('sig_abc123');
  });

  it('markProcessed without paymentId', () => {
    const e = WebhookEventEntity.receive({
      id: UUID,
      now: NOW,
      props: {
        gateway: 'bkash',
        gatewayEventId: 'evt_1',
        eventType: 'x',
        payload: {},
      },
    });
    e.verify();
    e.markProcessed();
    expect(e.processed).toBe(true);
    expect(e.paymentId).toBeUndefined();
  });

  it('canRetry after partial failures', () => {
    const e = WebhookEventEntity.receive({
      id: UUID,
      now: NOW,
      props: {
        gateway: 'bkash',
        gatewayEventId: 'evt_1',
        eventType: 'x',
        payload: {},
      },
    });
    e.markFailed(FailureReasonVO.create('1'));
    expect(e.canRetry()).toBe(true);
  });

  it('reconstitute with all optional fields + deletedAt', () => {
    const e = WebhookEventEntity.receive({
      id: UUID,
      now: NOW,
      props: {
        gateway: 'bkash',
        gatewayEventId: 'evt_1',
        eventType: 'x',
        payload: {},
      },
    });
    const recon = WebhookEventEntity.reconstitute({
      id: e.id,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      deletedAt: NOW,
      props: {
        gateway: e.gateway,
        gatewayEventId: e.gatewayEventId,
        eventType: e.eventType,
        payload: e.payload,
        verified: e.verified,
        processed: e.processed,
        attempts: e.attempts,
        maxAttempts: e.maxAttempts,
        receivedAt: e.receivedAt,
      },
      version: 3,
    });
    expect(recon.version).toBe(3);
    expect(recon.deletedAt).toBeDefined();
  });
});
