import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { UserActivityPrismaMapper, type PrismaUserActivityRow } from '../mappers/user-activity.prisma.mapper.js';
import { UserActivityEntity } from '../../../../domain/entities/user-activity.entity.js';
import type {
  UserActivityRepository,
  UserActivityListOptions,
  UserActivityPaginationResult,
} from '../../../../domain/repositories/user-activity.repository.interface.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

interface Delegate {
  findUnique(args: unknown): Promise<PrismaUserActivityRow | null>;
  findFirst(args: unknown): Promise<PrismaUserActivityRow | null>;
  findMany(args?: unknown): Promise<PrismaUserActivityRow[]>;
  create(args: unknown): Promise<PrismaUserActivityRow>;
  update(args: unknown): Promise<PrismaUserActivityRow>;
  delete(args: unknown): Promise<PrismaUserActivityRow>;
  count(args?: unknown): Promise<number>;
  deleteMany(args: unknown): Promise<{ count: number }>;
}

@Injectable()
export class UserActivityPrismaRepository implements UserActivityRepository {
  constructor(private readonly prisma: AuthPrismaService) {}
  private get delegate(): Delegate { return this.prisma.getModel<Delegate>('userActivity'); }

  async findById(id: string) {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? UserActivityPrismaMapper.toDomain(raw) : null;
  }
  async findAll() {
    const rows = await this.delegate.findMany({ where: { deletedAt: null }, orderBy: { createdAt: 'desc' }, take: 100 } as never);
    return rows.map((r) => UserActivityPrismaMapper.toDomain(r));
  }
  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }
  async save(entity: UserActivityEntity): Promise<UserActivityEntity> {
    const data = UserActivityPrismaMapper.toPersistence(entity);
    const raw = await this.delegate.create({ data: data as never });
    return UserActivityPrismaMapper.toDomain(raw);
  }
  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async softDelete(id: string): Promise<void> { return this.delete(id); }
  async findByUserId(userId: UserIdVO, limit = 20) {
    const rows = await this.delegate.findMany({
      where: { userId: userId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: limit,
    } as never);
    return rows.map((r) => UserActivityPrismaMapper.toDomain(r));
  }
  async findByType(type: string, limit = 20) {
    const rows = await this.delegate.findMany({
      where: { type, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: limit,
    } as never);
    return rows.map((r) => UserActivityPrismaMapper.toDomain(r));
  }
  async findSecurityEvents(userId: UserIdVO, limit = 20) {
    const rows = await this.delegate.findMany({
      where: {
        userId: userId.value,
        type: { in: ['login', 'logout', 'password_change', 'mfa_enabled', 'mfa_disabled'] },
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    } as never);
    return rows.map((r) => UserActivityPrismaMapper.toDomain(r));
  }
  async findRecent(userId: UserIdVO, sinceMs: number) {
    const cutoff = new Date(sinceMs);
    const rows = await this.delegate.findMany({
      where: { userId: userId.value, createdAt: { gte: cutoff }, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    } as never);
    return rows.map((r) => UserActivityPrismaMapper.toDomain(r));
  }
  async findPaginated(options: UserActivityListOptions): Promise<UserActivityPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (options.filter?.userId) where['userId'] = options.filter.userId;
    if (options.filter?.type) where['type'] = options.filter.type;
    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where: where as never,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
        orderBy: { createdAt: options.sortDir ?? 'desc' },
      }),
      this.delegate.count({ where: where as never }),
    ]);
    return {
      items: rows.map((r) => UserActivityPrismaMapper.toDomain(r)),
      total, page: options.page, limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }
  async purge(cutoffIso: string): Promise<number> {
    const r = await this.delegate.deleteMany({ where: { createdAt: { lt: new Date(cutoffIso) } } as never });
    return r.count;
  }
}
