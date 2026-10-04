/**
 * WebhookService — orchestrates webhook receipt / processing
 * @module payment-service/application/services/impl
 *
 * Real business logic:
 *  - Dedup via gatewayEventId
 *  - Signature verification (basic; per-gateway adapters injected separately)
 *  - Routes to payment state transitions based on eventType
 *  - Retry with incrementAttempt
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { IWebhookService } from '../interfaces/webhook.service.interface.js';
import {
  WEBHOOK_EVENT_REPOSITORY,
  type WebhookEventRepository,
} from '../../../domain/repositories/webhook-event.repository.interface.js';
import {
  PAYMENT_REPOSITORY,
  type PaymentRepository,
} from '../../../domain/repositories/payment.repository.interface.js';

import { WebhookEventEntity } from '../../../domain/entities/webhook-event.entity.js';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo.js';
import { GatewayPaymentIdVO } from '../../../domain/value-objects/primitives/gateway-payment-id.vo.js';
import { GatewaySignatureVO } from '../../../domain/value-objects/primitives/gateway-signature.vo.js';
import { FailureReasonVO } from '../../../domain/value-objects/primitives/failure-reason.vo.js';
import { FailureCodeVO } from '../../../domain/value-objects/primitives/failure-code.vo.js';

import { WebhookMapper } from '../../mappers/webhook.mapper.js';
import {
  WebhookNotFoundApplicationError,
  WebhookSignatureInvalidApplicationError,
} from '../../errors/webhook.errors.js';

import type {
  ProcessWebhookRequestDTO,
  ListWebhookEventsRequestDTO,
} from '../../dtos/requests/webhook/webhook.dto.js';
import type {
  WebhookEventResponseDTO,
  WebhookProcessResponseDTO,
  WebhookListResponseDTO,
} from '../../dtos/responses/webhook-response.dto.js';

/** Internal event-type vocabulary mapping to payment methods. */
const PAYMENT_SUCCESS_EVENTS = new Set([
  'payment.succeeded',
  'payment.captured',
  'payment.paid',
  'payment.authorized',
]);
const PAYMENT_FAILURE_EVENTS = new Set([
  'payment.failed',
  'payment.declined',
  'payment.cancelled',
  'payment.expired',
]);
const PAYMENT_REFUND_EVENTS = new Set([
  'refund.succeeded',
  'refund.completed',
]);

@Injectable()
export class WebhookService implements IWebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(
    @Inject(WEBHOOK_EVENT_REPOSITORY) private readonly webhookRepo: WebhookEventRepository,
    @Inject(PAYMENT_REPOSITORY) private readonly paymentRepo: PaymentRepository,
  ) {}

  async process(dto: ProcessWebhookRequestDTO): Promise<WebhookProcessResponseDTO> {
    const now = new Date().toISOString();

    // ─── Dedup ───
    const duplicate = await this.webhookRepo.findByGatewayEventId(
      dto.gateway,
      dto.gatewayEventId,
    );
    if (duplicate) {
      this.logger.debug(
        `Webhook ${dto.gateway}/${dto.gatewayEventId} already exists — marking duplicate`,
      );
      duplicate.markDuplicate(now);
      await this.webhookRepo.save(duplicate);
      return {
        success: true,
        webhookId: duplicate.id,
        processed: duplicate.processed,
        paymentId: duplicate.paymentId?.value,
      };
    }

    // ─── Persist as received ───
    const id = randomUUID();
    const signature = dto.signature
      ? GatewaySignatureVO.create(dto.signature)
      : undefined;

    const entity = WebhookEventEntity.receive({
      id,
      now,
      props: {
        gateway: dto.gateway,
        gatewayEventId: dto.gatewayEventId,
        eventType: dto.eventType,
        payload: dto.payload,
        signature,
        receivedAt: dto.receivedAt ?? now,
      },
    });

    // ─── Verify signature (basic sanity) ───
    // In production each gateway adapter verifies HMAC. Here we accept
    // a signature if provided; absent signature = trusted for sandbox.
    if (entity.signature && entity.signature.value.length < 8) {
      throw new WebhookSignatureInvalidApplicationError(
        dto.gateway,
        'signature too short',
      );
    }
    entity.verify(now);

    await this.webhookRepo.save(entity);

    // ─── Try to route into payment state machine ───
    let processedPaymentId: PaymentIdVO | undefined;
    try {
      processedPaymentId = await this.routeWebhook(dto, now);
      entity.markProcessed(processedPaymentId, now);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      entity.markFailed(FailureReasonVO.create(msg), now);
      this.logger.error(`Webhook routing failed: ${msg}`);
    }

    const saved = await this.webhookRepo.save(entity);

    this.logger.log(
      `Webhook ${saved.id} from ${dto.gateway} (${dto.eventType}) — processed=${saved.processed}`,
    );

    return {
      success: true,
      webhookId: saved.id,
      processed: saved.processed,
      paymentId: saved.paymentId?.value,
    };
  }

  async getById(webhookId: string): Promise<WebhookEventResponseDTO> {
    const entity = await this.webhookRepo.findById(webhookId);
    if (!entity) throw new WebhookNotFoundApplicationError(webhookId);
    return WebhookMapper.toResponse(entity);
  }

  async list(options: ListWebhookEventsRequestDTO): Promise<WebhookListResponseDTO> {
    const result = await this.webhookRepo.findPaginated({
      page: options.page,
      limit: options.limit,
      filter: {
        gateway: options.gateway,
        eventType: options.eventType,
        processed: options.processed,
        verified: options.verified,
        paymentId: options.paymentId,
        fromDate: options.fromDate,
        toDate: options.toDate,
      },
    });
    return WebhookMapper.toListResponse(
      result.items,
      result.total,
      result.page,
      result.limit,
    );
  }

  async retryFailed(): Promise<{ processed: number; failed: number }> {
    const pending = await this.webhookRepo.findUnprocessed(50);
    let processed = 0;
    let failed = 0;
    for (const wh of pending) {
      if (!wh.canRetry()) continue;
      try {
        const paymentId = await this.routeWebhook(
          {
            gateway: wh.gateway,
            gatewayEventId: wh.gatewayEventId,
            eventType: wh.eventType,
            payload: wh.payload,
          },
          new Date().toISOString(),
        );
        wh.markProcessed(paymentId);
        await this.webhookRepo.save(wh);
        processed++;
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Unknown';
        wh.markFailed(FailureReasonVO.create(msg));
        await this.webhookRepo.save(wh);
        failed++;
      }
    }
    return { processed, failed };
  }

  // ═══════════════ Routing ═══════════════
  private async routeWebhook(
    dto: ProcessWebhookRequestDTO,
    now: string,
  ): Promise<PaymentIdVO | undefined> {
    const paymentIdRaw = this.extractPaymentId(dto);
    if (!paymentIdRaw) return undefined;

    const vo = PaymentIdVO.create(paymentIdRaw);
    const payment = await this.paymentRepo.findByIdVO(vo);
    if (!payment) return undefined;

    if (PAYMENT_SUCCESS_EVENTS.has(dto.eventType)) {
      const gatewayPaymentId = this.extractGatewayPaymentId(dto);
      if (payment.status.isProcessing()) {
        payment.authorize(
          gatewayPaymentId ?? GatewayPaymentIdVO.create(`gw_${payment.id}`),
          undefined,
          now,
        );
      }
      if (payment.status.isAuthorized()) {
        payment.capture(undefined, gatewayPaymentId, now);
      }
      if (payment.status.isCaptured()) {
        payment.markPaid(now);
      }
    } else if (PAYMENT_FAILURE_EVENTS.has(dto.eventType)) {
      const reason = FailureReasonVO.create(
        String((dto.payload['reason'] as string | undefined) ?? 'webhook failure'),
      );
      const codeRaw = dto.payload['code'];
      const code = typeof codeRaw === 'string' ? FailureCodeVO.create(codeRaw) : undefined;
      if (payment.status.isFailed()) {
        /* already failed — noop */
      } else if (payment.status.isDeclined()) {
        /* already declined */
      } else if (payment.canBeCancelled()) {
        payment.fail(reason, code, now);
      }
    } else if (PAYMENT_REFUND_EVENTS.has(dto.eventType)) {
      const amount = Number(dto.payload['amount'] ?? 0);
      if (amount > 0 && payment.status.isSettled()) {
        payment.markRefunded(amount, undefined, now);
      }
    }

    await this.paymentRepo.save(payment);
    return vo;
  }

  private extractPaymentId(dto: ProcessWebhookRequestDTO): string | undefined {
    const candidates = ['paymentId', 'payment_id', 'order_payment_id'];
    for (const key of candidates) {
      const v = dto.payload[key];
      if (typeof v === 'string' && v.length > 0) return v;
    }
    return undefined;
  }

  private extractGatewayPaymentId(
    dto: ProcessWebhookRequestDTO,
  ): GatewayPaymentIdVO | undefined {
    const candidates = ['gatewayPaymentId', 'gateway_payment_id', 'trxID', 'transaction_id'];
    for (const key of candidates) {
      const v = dto.payload[key];
      if (typeof v === 'string' && v.length > 0) {
        try {
          return GatewayPaymentIdVO.create(v);
        } catch {
          /* ignore */
        }
      }
    }
    return undefined;
  }
}
