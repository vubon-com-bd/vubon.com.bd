/**
 * Webhook Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { WebhookEntity } from '@domain/entities/webhook.entity.js';
import type { WebhookIdVO } from '@domain/primitives/webhook-id.vo.js';

// ─── DI Token ─────────────────────────────
export const WEBHOOK_REPOSITORY = Symbol('WEBHOOK_REPOSITORY');

// ─── Filter ───────────────────────────────
export interface WebhookListFilter {
  readonly type?: string;
  readonly status?: string;
  readonly event?: string;
  readonly url?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}

// ─── List Options ─────────────────────────
export interface WebhookListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'lastTriggeredAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: WebhookListFilter;
}

// ─── Pagination Result ────────────────────
export interface WebhookPaginationResult {
  readonly items: readonly WebhookEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Stats ────────────────────────────────
export interface WebhookStats {
  readonly total: number;
  readonly activeCount: number;
  readonly failedCount: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
}

// ─── Main Interface ───────────────────────
export interface WebhookRepository extends BaseRepository<WebhookEntity, string> {
  findByIdVO(id: WebhookIdVO): Promise<WebhookEntity | null>;
  findByUrl(url: string): Promise<WebhookEntity | null>;
  findByStatus(status: string): Promise<readonly WebhookEntity[]>;
  findByEvent(event: string): Promise<readonly WebhookEntity[]>;
  findActiveSubscribers(event: string): Promise<readonly WebhookEntity[]>;

  findPaginated(options: WebhookListOptions): Promise<WebhookPaginationResult>;

  countActive(): Promise<number>;
  getStats(): Promise<WebhookStats>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
  purgeDisabledOlderThan(cutoff: string): Promise<number>;
}
