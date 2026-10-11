/**
 * Webhook Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { WebhookEntity } from '../entities/webhook.entity.js';
import { WebhookIdVO } from '../value-objects/primitives/webhook-id.vo.js';
import { WebhookStatusVO } from '../value-objects/primitives/webhook-status.vo.js';
import { WebhookEventVO } from '../value-objects/primitives/webhook-event.vo.js';

export const WEBHOOK_REPOSITORY = Symbol('WEBHOOK_REPOSITORY');

export interface WebhookListFilter {
  readonly status?: string;
  readonly event?: string;
  readonly search?: string;
}

export interface WebhookListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'lastSuccessAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: WebhookListFilter;
}

export interface WebhookPaginationResult {
  readonly items: readonly WebhookEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface WebhookRepository extends BaseRepository<WebhookEntity, string> {
  findByIdVO(id: WebhookIdVO): Promise<WebhookEntity | null>;
  findByStatus(status: WebhookStatusVO): Promise<readonly WebhookEntity[]>;
  findByEvent(event: WebhookEventVO): Promise<readonly WebhookEntity[]>;
  findPaginated(options: WebhookListOptions): Promise<WebhookPaginationResult>;
  findAllActive(): Promise<readonly WebhookEntity[]>;
  countActive(): Promise<number>;
  /** Webhooks failing repeatedly that may need disabling. */
  findWithHighFailureCount(threshold: number): Promise<readonly WebhookEntity[]>;
}
