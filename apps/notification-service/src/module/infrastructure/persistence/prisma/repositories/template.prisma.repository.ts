/**
 * TemplatePrismaRepository — implements TemplateRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  TemplateRepository,
  TemplateListOptions,
  TemplatePaginationResult,
} from '../../../../domain/repositories/template.repository.interface.js';
import { TemplateEntity } from '../../../../domain/entities/template.entity.js';
import { TemplateIdVO } from '../../../../domain/value-objects/primitives/template-id.vo.js';
import { TemplateTypeVO } from '../../../../domain/value-objects/primitives/template-type.vo.js';
import { TemplateStatusVO } from '../../../../domain/value-objects/primitives/template-status.vo.js';
import { TemplateCategoryVO } from '../../../../domain/value-objects/primitives/template-category.vo.js';
import { TemplateLocaleVO } from '../../../../domain/value-objects/primitives/template-locale.vo.js';
import { TemplatePrismaMapper } from '../mappers/template.prisma.mapper.js';

@Injectable()
export class TemplatePrismaRepository implements TemplateRepository {
  private readonly logger = new Logger(TemplatePrismaRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<TemplateEntity | null> {
    return this.findByIdVO(TemplateIdVO.reconstitute(id));
  }

  async findByIdVO(id: TemplateIdVO): Promise<TemplateEntity | null> {
    const row = await this.prisma.notificationTemplate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return row ? TemplatePrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly TemplateEntity[]> {
    const rows = await this.prisma.notificationTemplate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => TemplatePrismaMapper.toDomain(r));
  }

  async findBySlug(slug: string): Promise<TemplateEntity | null> {
    const row = await this.prisma.notificationTemplate.findFirst({
      where: { slug, deletedAt: null },
      orderBy: { version: 'desc' },
    });
    return row ? TemplatePrismaMapper.toDomain(row) : null;
  }

  async findBySlugAndLocale(
    slug: string,
    locale: TemplateLocaleVO,
  ): Promise<TemplateEntity | null> {
    const row = await this.prisma.notificationTemplate.findFirst({
      where: { slug, locale: locale.value, deletedAt: null },
    });
    return row ? TemplatePrismaMapper.toDomain(row) : null;
  }

  async findByType(type: TemplateTypeVO): Promise<readonly TemplateEntity[]> {
    const rows = await this.prisma.notificationTemplate.findMany({
      where: { type: type.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => TemplatePrismaMapper.toDomain(r));
  }

  async findByStatus(status: TemplateStatusVO): Promise<readonly TemplateEntity[]> {
    const rows = await this.prisma.notificationTemplate.findMany({
      where: { status: status.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => TemplatePrismaMapper.toDomain(r));
  }

  async findByCategory(category: TemplateCategoryVO): Promise<readonly TemplateEntity[]> {
    const rows = await this.prisma.notificationTemplate.findMany({
      where: { category: category.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => TemplatePrismaMapper.toDomain(r));
  }

  async findByLocale(locale: TemplateLocaleVO): Promise<readonly TemplateEntity[]> {
    const rows = await this.prisma.notificationTemplate.findMany({
      where: { locale: locale.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => TemplatePrismaMapper.toDomain(r));
  }

  async findActiveBySlug(slug: string): Promise<TemplateEntity | null> {
    const row = await this.prisma.notificationTemplate.findFirst({
      where: { slug, status: 'active', deletedAt: null },
    });
    return row ? TemplatePrismaMapper.toDomain(row) : null;
  }

  async findPaginated(options: TemplateListOptions): Promise<TemplatePaginationResult> {
    const where = this.buildWhere(options);
    const orderBy = this.buildOrderBy(options);

    const [rows, total] = await Promise.all([
      this.prisma.notificationTemplate.findMany({
        where,
        orderBy,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.prisma.notificationTemplate.count({ where }),
    ]);

    return {
      items: rows.map((r) => TemplatePrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async save(entity: TemplateEntity): Promise<TemplateEntity> {
    const data = TemplatePrismaMapper.toPersistence(entity);
    const existing = await this.prisma.notificationTemplate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.prisma.notificationTemplate.update({
        where: { id: entity.id },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
      });
      return TemplatePrismaMapper.toDomain(updated);
    }

    const created = await this.prisma.notificationTemplate.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    });
    return TemplatePrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.notificationTemplate.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.notificationTemplate.count({ where: { id } });
    return count > 0;
  }

  async existsBySlug(slug: string, excludeId?: string): Promise<boolean> {
    const count = await this.prisma.notificationTemplate.count({
      where: {
        slug,
        deletedAt: null,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
    return count > 0;
  }

  private buildWhere(options: TemplateListOptions): Record<string, unknown> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.type) where['type'] = f.type;
    if (f.status) where['status'] = f.status;
    if (f.category) where['category'] = f.category;
    if (f.locale) where['locale'] = f.locale;
    if (f.search) {
      where['OR'] = [
        { name: { contains: f.search, mode: 'insensitive' } },
        { slug: { contains: f.search, mode: 'insensitive' } },
      ];
    }
    return where;
  }

  private buildOrderBy(
    options: TemplateListOptions,
  ): Record<string, 'asc' | 'desc'> {
    const dir = options.sortDir ?? 'desc';
    const field = options.sortBy ?? 'createdAt';
    return { [field]: dir };
  }
}
