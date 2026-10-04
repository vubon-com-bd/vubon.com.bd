/**
 * RefundProcessorWorker — processes approved refunds end-to-end
 * @module payment-service/infrastructure/workers
 *
 * Flow:
 *  1. Load refund + payment
 *  2. Resolve gateway adapter
 *  3. Call gateway.refund()
 *  4. On success → refund.succeed() + payment.markRefunded() + tx record
 *  5. On failure → refund.fail() + schedule retry (up to 3)
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import {
  PAYMENT_QUEUE_NAME,
  PAYMENT_JOB_NAME,
} from '../queues/queue.constants.js';
import type { ProcessRefundPayload } from '../queues/refund.queue.js';
import { RefundQueue } from '../queues/refund.queue.js';
import {
  REFUND_REPOSITORY,
  type RefundRepository,
} from '../../domain/repositories/refund.repository.interface.js';
import {
  PAYMENT_REPOSITORY,
  type PaymentRepository,
} from '../../domain/repositories/payment.repository.interface.js';
import {
  TRANSACTION_REPOSITORY,
  type TransactionRepository,
} from '../../domain/repositories/transaction.repository.interface.js';
import { RefundIdVO } from '../../domain/value-objects/primitives/refund-id.vo.js';
import { TransactionEntity } from '../../domain/entities/transaction.entity.js';
import { TransactionTypeVO } from '../../domain/value-objects/primitives/transaction-type.vo.js';
import { TransactionReferenceVO } from '../../domain/value-objects/primitives/transaction-reference.vo.js';
import { FailureReasonVO } from '../../domain/value-objects/primitives/failure-reason.vo.js';
import { FailureCodeVO } from '../../domain/value-objects/primitives/failure-code.vo.js';
import { GatewayResolverService } from '../gateways/gateway-resolver.service.js';
import type { GatewayRefundResult } from '../gateways/payment-gateway.adapter.js';
import { randomUUID } from 'node:crypto';

@Injectable()
export class RefundProcessorWorker extends BaseWorker<ProcessRefundPayload> {
  protected readonly queueName = PAYMENT_QUEUE_NAME.PAYMENT_PROCESSING;
  protected readonly jobNames = [
    PAYMENT_JOB_NAME.PROCESS_REFUND,
    PAYMENT_JOB_NAME.RETRY_REFUND,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(REFUND_REPOSITORY) private readonly refundRepo: RefundRepository,
    @Inject(PAYMENT_REPOSITORY) private readonly paymentRepo: PaymentRepository,
    @Inject(TRANSACTION_REPOSITORY) private readonly txRepo: TransactionRepository,
    private readonly gatewayResolver: GatewayResolverService,
    private readonly refundQueue: RefundQueue,
  ) {
    super(queueService, 'RefundProcessorWorker');
  }

  protected async handle(payload: ProcessRefundPayload): Promise<unknown> {
    const { refundId } = payload;
    const refund = await this.refundRepo.findByIdVO(RefundIdVO.create(refundId));
    if (!refund) return { skipped: true, reason: 'not_found' };
    if (refund.isFinal()) return { skipped: true, reason: 'already_final' };

    const payment = await this.paymentRepo.findByIdVO(refund.paymentId);
    if (!payment) {
      refund.fail(
        FailureReasonVO.create('payment not found'),
        FailureCodeVO.create('PAYMENT_NOT_FOUND'),
      );
      await this.refundRepo.save(refund);
      return { failed: true };
    }

    // Resolve gateway adapter (or default manual result)
    let gatewayResult: GatewayRefundResult = {
      success: true,
      gatewayRefundId: `manual_${refund.id.slice(0, 8)}`,
      processedAt: new Date().toISOString(),
    };

    if (payment.gateway) {
      const adapter = this.gatewayResolver.resolve(payment.gateway.value);
      if (adapter.isEnabled()) {
        refund.startProcessing();
        await this.refundRepo.save(refund);
        gatewayResult = await adapter.refund({
          payment,
          amount: refund.amount,
          reason: refund.reason?.value,
        });
      }
    }

    if (gatewayResult.success) {
      const now = gatewayResult.processedAt ?? new Date().toISOString();
      refund.succeed(gatewayResult.gatewayRefundId, now);
      await this.refundRepo.save(refund);

      payment.markRefunded(refund.amount, refund.id, now);
      await this.paymentRepo.save(payment);

      // Ledger entry
      const tx = TransactionEntity.create({
        id: randomUUID(),
        now,
        props: {
          paymentId: refund.paymentId,
          orderId: refund.orderId,
          type: TransactionTypeVO.create('refund'),
          amount: refund.amount,
          currency: refund.currency,
          gateway: payment.gateway?.value,
          reference: TransactionReferenceVO.create(`refund:${refund.id}`),
        },
      });
      tx.markSucceeded(gatewayResult.gatewayRefundId, now);
      await this.txRepo.save(tx);

      this.logger.log(
        `Refund ${refundId} succeeded via ${payment.gateway?.value ?? 'manual'}`,
      );
      return { refunded: true };
    }

    // Failure path — retry up to 3 times
    const reason = FailureReasonVO.create(gatewayResult.error ?? 'gateway error');
    const code = gatewayResult.errorCode
      ? FailureCodeVO.create(gatewayResult.errorCode)
      : undefined;
    refund.fail(reason, code);
    await this.refundRepo.save(refund);

    if (refund.status.canTransitionTo('pending')) {
      await this.refundQueue.enqueueRetry({ refundId, attempt: 2 }, 120_000);
    }
    this.logger.warn(`Refund ${refundId} failed: ${reason.value}`);
    return { failed: true };
  }
}
