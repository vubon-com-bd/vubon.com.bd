/**
 * TemplatePrismaRepository — implements TemplateRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  TemplateRepository,
  TemplateListOptions,
  TemplateListFilter,
  TemplatePaginationResult,
  TemplateStats,
} from '@domain/repositories/template.repository.interface.js';
import { TEMPLATE_REPOSITORY } from '@domain/repositories/template.repository.interface.js';
import { TemplateEntity } from '@domain/entities/template.entity.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';

import {
  NotificationBasePrismaRepository,
  type PrismaDelegate,
} from '@infrastructure/persistence/prisma/base.prisma.repository.js';
import type { PrismaNotificationTemplate } from '@infrastructure/persistence/prisma/prisma.client.js';
import { TemplatePrismaMapper } from '@infrastructure/persistence/prisma/mappers/template.prisma.mapper.js';

const MODEL_NAME = 'notificationTemplate';

@Injectable()
export class TemplatePrismaRepository
  extends NotificationBasePrismaRepository
  implements TemplateRepository
{
  private readonly logger = new Logger(TemplatePrismaRepository.name);

  private get delegate(): PrismaDelegate<PrismaNotificationTemplate> {
    return this.model<PrismaNotificationTemplate>(MODEL_NAME);
  }

  // ═══════════════ Base CRUD ═══════════════
  async findById(id: string): Promise<TemplateEntity | null> {
    return this.findByIdVO(TemplateIdVO.reconstitute(id));
  }

  async findByIdVO(id: TemplateIdVO): Promise<TemplateEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? TemplatePrismaMapper.toDomain(raw) : null;
  }

  async findBySlug(slug: string): Promise<TemplateEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { slug, deletedAt: null },
    });
    return raw ? TemplatePrismaMapper.toDomain(raw) : null;
  }

  async findByName(name: string): Promise<TemplateEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { name, deletedAt: null },
    });
    return raw ? TemplatePrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TemplateEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => TemplatePrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: TemplateEntity): Promise<TemplateEntity> {
    const data = TemplatePrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return TemplatePrismaMapper.toDomain(updated);
    }

    const created = await this.delegate.create({ data: data as never });
    return TemplatePrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string, deletedBy?: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date() } as never,
    });
    this.logger.debug(`Template ${id} soft-deleted by ${deletedBy ?? 'system'}`);
  }

  // ═══════════════ Custom queries ═══════════════
  async findByType(type: string): Promise<readonly TemplateEntity[]> {
    const rows = await this.delegate.findMany({
      where: { type, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => TemplatePrismaMapper.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly TemplateEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => TemplatePrismaMapper.toDomain(r));
  }

  async findActiveByTypeAndLocale(
    type: string,
    locale: string,
  ): Promise<readonly TemplateEntity[]> {
    const rows = await this.delegate.findMany({
      where: { type, locale, status: 'active', deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => TemplatePrismaMapper.toDomain(r));
  }

  async findPaginated(options: TemplateListOptions): Promise<TemplatePaginationResult> {
    const where = this.buildWhere(options.filter);
    const orderBy = { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' };

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where,
        orderBy: orderBy as never,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where }),
    ]);

    return {
      items: rows.map((r) => TemplatePrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async findWithMissingSubject(): Promise<readonly TemplateEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        subject: null,
        type: { in: ['transactional', 'security'] },
        deletedAt: null,
      },
    });
    return rows.map((r) => TemplatePrismaMapper.toDomain(r));
  }

  async findByParent(parentId: string): Promise<readonly TemplateEntity[]> {
    const rows = await this.delegate.findMany({
      where: { parentId, deletedAt: null },
    });
    return rows.map((r) => TemplatePrismaMapper.toDomain(r));
  }

  async countBySlug(slug: string): Promise<number> {
    return this.delegate.count({ where: { slug, deletedAt: null } });
  }

  async getStats(): Promise<TemplateStats> {
    const rows = (await this.delegate.findMany({
      where: { deletedAt: null },
      select: { status: true, type: true, category: true },
    })) as Array<{ status: string; type: string; category: string }>;

    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    const byFormat: Record<string, number> = {};

    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      byType[r.type] = (byType[r.type] ?? 0) + 1;
      byFormat['html'] = (byFormat['html'] ?? 0) + 1;
    }

    return { total: rows.length, byStatus, byType, byFormat };
  }

  // ═══════════════ Helpers ═══════════════
  private buildWhere(filter?: TemplateListFilter): Record<string, unknown> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (!filter) return where;

    if (filter.type) where['type'] = filter.type;
    if (filter.status) where['status'] = filter.status;
    if (filter.category) where['category'] = filter.category;
    if (filter.locale) where['locale'] = filter.locale;
    if (filter.search) {
      where['OR'] = [
        { name: { contains: filter.search, mode: 'insensitive' } },
        { slug: { contains: filter.search, mode: 'insensitive' } },
      ];
    }
    return where;
  }

  static readonly _token = TEMPLATE_REPOSITORY;
}
