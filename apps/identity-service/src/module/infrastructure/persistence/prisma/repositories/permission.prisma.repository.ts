import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { PermissionPrismaMapper, type PrismaPermissionRow } from '../mappers/permission.prisma.mapper.js';
import { PermissionEntity } from '../../../../domain/entities/permission.entity.js';
import type {
  PermissionRepository,
  PermissionListOptions,
  PermissionPaginationResult,
  PermissionStats,
} from '../../../../domain/repositories/permission.repository.interface.js';

interface Delegate {
  findUnique(args: unknown): Promise<PrismaPermissionRow | null>;
  findFirst(args: unknown): Promise<PrismaPermissionRow | null>;
  findMany(args?: unknown): Promise<PrismaPermissionRow[]>;
  create(args: unknown): Promise<PrismaPermissionRow>;
  update(args: unknown): Promise<PrismaPermissionRow>;
  delete(args: unknown): Promise<PrismaPermissionRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class PermissionPrismaRepository implements PermissionRepository {
  constructor(private readonly prisma: AuthPrismaService) {}
  private get delegate(): Delegate { return this.prisma.getModel<Delegate>('authPermission'); }

  async findById(id: string) {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? PermissionPrismaMapper.toDomain(raw) : null;
  }
  async findAll() {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => PermissionPrismaMapper.toDomain(r));
  }
  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }
  async save(entity: PermissionEntity): Promise<PermissionEntity> {
    const data = PermissionPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } as never });
    const raw = existing
      ? await this.delegate.update({ where: { id: entity.id }, data: data as never })
      : await this.delegate.create({ data: data as never });
    return PermissionPrismaMapper.toDomain(raw);
  }
  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async softDelete(id: string): Promise<void> { return this.delete(id); }
  async findByName(name: string) {
    const raw = await this.delegate.findFirst({ where: { name, deletedAt: null } });
    return raw ? PermissionPrismaMapper.toDomain(raw) : null;
  }
  async findByCategory(category: string) {
    const rows = await this.delegate.findMany({ where: { resource: category, deletedAt: null } as never });
    return rows.map((r) => PermissionPrismaMapper.toDomain(r));
  }
  async findSensitive() {
    const rows = await this.delegate.findMany({
      where: { action: { in: ['delete', 'manage'] }, deletedAt: null } as never,
    });
    return rows.map((r) => PermissionPrismaMapper.toDomain(r));
  }
  async findPaginated(options: PermissionListOptions): Promise<PermissionPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (options.filter?.category) where['resource'] = options.filter.category;
    const [rows, total] = await Promise.all([
      this.delegate.findMany({ where: where as never, skip: (options.page - 1) * options.limit, take: options.limit }),
      this.delegate.count({ where: where as never }),
    ]);
    return {
      items: rows.map((r) => PermissionPrismaMapper.toDomain(r)),
      total, page: options.page, limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }
  async getStats(): Promise<PermissionStats> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    const byCategory: Record<string, number> = {};
    let sensitiveCount = 0;
    for (const r of rows) {
      byCategory[r.resource] = (byCategory[r.resource] ?? 0) + 1;
      if (r.action === 'delete' || r.action === 'manage') sensitiveCount++;
    }
    return { total: rows.length, sensitiveCount, byCategory };
  }
}
