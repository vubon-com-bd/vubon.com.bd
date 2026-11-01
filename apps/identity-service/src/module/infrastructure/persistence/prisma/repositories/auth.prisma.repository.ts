/**
 * Auth Prisma Repository — implements AuthRepository
 * @module identity-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { AuthPrismaMapper, type PrismaAuthRow } from '../mappers/auth.prisma.mapper.js';
import { AuthEntity } from '../../../../domain/entities/auth.entity.js';
import type {
  AuthRepository,
  AuthListOptions,
  AuthPaginationResult,
  AuthStats,
} from '../../../../domain/repositories/auth.repository.interface.js';
import type { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

interface UserDelegate {
  findUnique(args: unknown): Promise<PrismaAuthRow | null>;
  findFirst(args: unknown): Promise<PrismaAuthRow | null>;
  findMany(args?: unknown): Promise<PrismaAuthRow[]>;
  create(args: unknown): Promise<PrismaAuthRow>;
  update(args: unknown): Promise<PrismaAuthRow>;
  delete(args: unknown): Promise<PrismaAuthRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class AuthPrismaRepository implements AuthRepository {
  constructor(private readonly prisma: AuthPrismaService) {}

  private get delegate(): UserDelegate {
    return this.prisma.getModel<UserDelegate>('user');
  }

  async findById(id: string): Promise<AuthEntity | null> {
    const raw = await this.delegate.findUnique({
      where: { id },
    });
    return raw && !raw.deletedAt ? AuthPrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: AuthIdVO): Promise<AuthEntity | null> {
    return this.findById(id.value);
  }

  async findAll(): Promise<readonly AuthEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => AuthPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({
      where: { id, deletedAt: null },
    });
    return count > 0;
  }

  async save(entity: AuthEntity): Promise<AuthEntity> {
    const data = AuthPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true } as never,
    });
    const raw = existing
      ? await this.delegate.update({ where: { id: entity.id }, data: data as never })
      : await this.delegate.create({ data: data as never });
    return AuthPrismaMapper.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date() } as never,
    });
  }

  async softDelete(id: string): Promise<void> {
    return this.delete(id);
  }

  async findByUserId(userId: UserIdVO): Promise<readonly AuthEntity[]> {
    const rows = await this.delegate.findMany({
      where: { id: userId.value, deletedAt: null },
    });
    return rows.map((r) => AuthPrismaMapper.toDomain(r));
  }

  async findByIdentifier(identifier: string): Promise<AuthEntity | null> {
    const raw = await this.delegate.findFirst({
      where: {
        OR: [{ email: identifier }, { phone: identifier }],
        deletedAt: null,
      },
    });
    return raw ? AuthPrismaMapper.toDomain(raw) : null;
  }

  async findByUserIdAndProvider(userId: UserIdVO, _provider: string): Promise<AuthEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: userId.value, deletedAt: null },
    });
    return raw ? AuthPrismaMapper.toDomain(raw) : null;
  }

  async findPaginated(options: AuthListOptions): Promise<AuthPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.status) where['status'] = f.status;
    if (f.type) where['type'] = f.type;
    if (f.identifier) where['email'] = f.identifier;

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
      items: rows.map((r) => AuthPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(): Promise<AuthStats> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null } as never,
    });
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    let activeCount = 0;
    let mfaCount = 0;
    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      byType[r.type] = (byType[r.type] ?? 0) + 1;
      if (r.status === 'active') activeCount++;
    }
    return {
      total: rows.length,
      byStatus,
      byType,
      byProvider: {},
      activeCount,
      lockedCount: 0,
      mfaEnabledCount: mfaCount,
    };
  }

  async findLockedExpired(): Promise<readonly AuthEntity[]> {
    const rows = await this.delegate.findMany({ where: { status: "locked", deletedAt: null } as never });
    return rows.map((r) => AuthPrismaMapper.toDomain(r));
  }

  async findInactive(olderThanDays: number): Promise<readonly AuthEntity[]> {
    const cutoff = new Date(Date.now() - olderThanDays * 24 * 3600 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: 'inactive',
        updatedAt: { lt: cutoff },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => AuthPrismaMapper.toDomain(r));
  }

  async findUnverified(olderThanHours: number): Promise<readonly AuthEntity[]> {
    const cutoff = new Date(Date.now() - olderThanHours * 3600 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        emailVerified: false,
        createdAt: { lt: cutoff },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => AuthPrismaMapper.toDomain(r));
  }
}
