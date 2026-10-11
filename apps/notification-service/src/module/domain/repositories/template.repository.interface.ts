/**
 * Template Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TemplateEntity } from '../entities/template.entity.js';
import { TemplateIdVO } from '../value-objects/primitives/template-id.vo.js';
import { TemplateTypeVO } from '../value-objects/primitives/template-type.vo.js';
import { TemplateStatusVO } from '../value-objects/primitives/template-status.vo.js';
import { TemplateCategoryVO } from '../value-objects/primitives/template-category.vo.js';
import { TemplateLocaleVO } from '../value-objects/primitives/template-locale.vo.js';

export const TEMPLATE_REPOSITORY = Symbol('TEMPLATE_REPOSITORY');

export interface TemplateListFilter {
  readonly type?: string;
  readonly status?: string;
  readonly category?: string;
  readonly locale?: string;
  readonly search?: string;
}

export interface TemplateListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'name' | 'version';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: TemplateListFilter;
}

export interface TemplatePaginationResult {
  readonly items: readonly TemplateEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface TemplateRepository extends BaseRepository<TemplateEntity, string> {
  findByIdVO(id: TemplateIdVO): Promise<TemplateEntity | null>;
  findBySlug(slug: string): Promise<TemplateEntity | null>;
  findBySlugAndLocale(slug: string, locale: TemplateLocaleVO): Promise<TemplateEntity | null>;
  findByType(type: TemplateTypeVO): Promise<readonly TemplateEntity[]>;
  findByStatus(status: TemplateStatusVO): Promise<readonly TemplateEntity[]>;
  findByCategory(category: TemplateCategoryVO): Promise<readonly TemplateEntity[]>;
  findByLocale(locale: TemplateLocaleVO): Promise<readonly TemplateEntity[]>;
  findActiveBySlug(slug: string): Promise<TemplateEntity | null>;
  findPaginated(options: TemplateListOptions): Promise<TemplatePaginationResult>;
  existsBySlug(slug: string, excludeId?: string): Promise<boolean>;
}
