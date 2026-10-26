/**
 * Template Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { TemplateEntity } from '@domain/entities/template.entity.js';
import type { TemplateIdVO } from '@domain/primitives/template-id.vo.js';

// ─── DI Token ─────────────────────────────
export const TEMPLATE_REPOSITORY = Symbol('TEMPLATE_REPOSITORY');

// ─── Filter ───────────────────────────────
export interface TemplateListFilter {
  readonly type?: string;
  readonly status?: string;
  readonly category?: string;
  readonly format?: string;
  readonly locale?: string;
  readonly search?: string;
}

// ─── List Options ─────────────────────────
export interface TemplateListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'name' | 'version';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: TemplateListFilter;
}

// ─── Pagination Result ────────────────────
export interface TemplatePaginationResult {
  readonly items: readonly TemplateEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Stats ────────────────────────────────
export interface TemplateStats {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly byFormat: Readonly<Record<string, number>>;
}

// ─── Main Interface ───────────────────────
export interface TemplateRepository extends BaseRepository<TemplateEntity, string> {
  findByIdVO(id: TemplateIdVO): Promise<TemplateEntity | null>;
  findBySlug(slug: string): Promise<TemplateEntity | null>;
  findByName(name: string): Promise<TemplateEntity | null>;
  findByType(type: string): Promise<readonly TemplateEntity[]>;
  findByStatus(status: string): Promise<readonly TemplateEntity[]>;
  findActiveByTypeAndLocale(type: string, locale: string): Promise<readonly TemplateEntity[]>;

  findPaginated(options: TemplateListOptions): Promise<TemplatePaginationResult>;

  findWithMissingSubject(): Promise<readonly TemplateEntity[]>;
  findByParent(parentId: string): Promise<readonly TemplateEntity[]>;

  countBySlug(slug: string): Promise<number>;
  getStats(): Promise<TemplateStats>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
}
