/**
 * WebhookEvent Repository Interface
 * @module payment-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { WebhookEventEntity } from '../entities/webhook-event.entity.js';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo.js';

export const WEBHOOK_EVENT_REPOSITORY = Symbol('WEBHOOK_EVENT_REPOSITORY');

export interface WebhookEventListFilter {
  readonly gateway?: string;
  readonly eventType?: string;
  readonly processed?: boolean;
  readonly verified?: boolean;
  readonly paymentId?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface WebhookEventListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: WebhookEventListFilter;
}

export interface WebhookEventPaginationResult {
  readonly items: readonly WebhookEventEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface WebhookEventRepository extends BaseRepository<WebhookEventEntity, string> {
  findByGatewayEventId(
    gateway: string,
    gatewayEventId: string,
  ): Promise<WebhookEventEntity | null>;
  existsByGatewayEventId(gateway: string, gatewayEventId: string): Promise<boolean>;
  findByPaymentId(paymentId: PaymentIdVO): Promise<readonly WebhookEventEntity[]>;
  findUnprocessed(limit?: number): Promise<readonly WebhookEventEntity[]>;
  findPaginated(options: WebhookEventListOptions): Promise<WebhookEventPaginationResult>;
  countUnprocessed(): Promise<number>;
  /** Old processed webhooks for cleanup (retention policy). */
  findProcessedOlderThan(days: number): Promise<readonly WebhookEventEntity[]>;
}
