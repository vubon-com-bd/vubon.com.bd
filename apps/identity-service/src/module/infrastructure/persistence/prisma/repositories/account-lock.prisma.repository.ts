/**
 * Account Lock Prisma Repository
 * @module identity-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import {
  AccountLockPrismaMapper,
  type PrismaAccountLockRow,
} from '../mappers/account-lock.prisma.mapper.js';
import { AccountLockEntity } from '../../../../domain/entities/account-lock.entity.js';
import type {
  AccountLockRepository,
  AccountLockListOptions,
  AccountLockPaginationResult,
  AccountLockStats,
} from '../../../../domain/repositories/account-lock.repository.interface.js';
import type { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';

interface LockDelegate {
  findUnique(args: unknown): Promise<PrismaAccountLockRow | null>;
  findFirst(args: unknown): Promise<PrismaAccountLockRow | null>;
  findMany(args?: unknown): Promise<PrismaAccountLockRow[]>;
  create(args: unknown): Promise<PrismaAccountLockRow>;
  update(args: unknown): Promise<PrismaAccountLockRow>;
  delete(args: unknown): Promise<PrismaAccountLockRow>;
  count(args?: unknown): Promise<number>;
  updateMany(args: unknown): Promise<{ count: number }>;
}

@Injectable()
export class AccountLockPrismaRepository implements AccountLockRepository {
  constructor(private readonly prisma: AuthPrismaService) {}

  private get delegate(): LockDelegate {
    return this.prisma.getModel<LockDelegate>('authAccountLock');
  }

  async findById(id: string): Promise<AccountLockEntity | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? AccountLockPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AccountLockEntity[]> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => AccountLockPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }

  async save(entity: AccountLockEntity): Promise<AccountLockEntity> {
    const data = AccountLockPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true } as never,
    });
    const raw = existing
      ? await this.delegate.update({ where: { id: entity.id }, data: data as never })
      : await this.delegate.create({ data: data as never });
    return AccountLockPrismaMapper.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }

  async softDelete(id: string): Promise<void> {
    return this.delete(id);
  }

  async findActiveByAuthId(authId: AuthIdVO): Promise<AccountLockEntity | null> {
    const raw = await this.delegate.findFirst({
      where: {
        userId: authId.value,
        unlockedAt: null,
        expiresAt: { gt: new Date() },
        deletedAt: null,
      } as never,
    });
    return raw ? AccountLockPrismaMapper.toDomain(raw) : null;
  }

  async findActiveByUserId(userId: string): Promise<AccountLockEntity | null> {
    const raw = await this.delegate.findFirst({
      where: {
        userId,
        unlockedAt: null,
        expiresAt: { gt: new Date() },
        deletedAt: null,
      } as never,
    });
    return raw ? AccountLockPrismaMapper.toDomain(raw) : null;
  }

  async findByAuthId(authId: AuthIdVO): Promise<readonly AccountLockEntity[]> {
    const rows = await this.delegate.findMany({
      where: { userId: authId.value, deletedAt: null },
    });
    return rows.map((r) => AccountLockPrismaMapper.toDomain(r));
  }

  async findPaginated(options: AccountLockListOptions): Promise<AccountLockPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.authId) where['userId'] = f.authId;
    if (f.active === true) where['unlockedAt'] = null;

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where: where as never,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where: where as never }),
    ]);

    return {
      items: rows.map((r) => AccountLockPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(): Promise<AccountLockStats> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    const byReason: Record<string, number> = {};
    let activeCount = 0;
    for (const r of rows) {
      byReason[r.reason] = (byReason[r.reason] ?? 0) + 1;
      if (!r.unlockedAt && new Date(r.expiresAt) > new Date()) activeCount++;
    }
    return { total: rows.length, activeCount, byReason };
  }

  async findExpired(nowMs: number = Date.now()): Promise<readonly AccountLockEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        unlockedAt: null,
        expiresAt: { lt: new Date(nowMs) },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => AccountLockPrismaMapper.toDomain(r));
  }

  async autoUnlockExpired(nowMs: number = Date.now()): Promise<number> {
    const result = await this.delegate.updateMany({
      where: { unlockedAt: null, expiresAt: { lt: new Date(nowMs) } },
      data: { unlockedAt: new Date() } as never,
    });
    return result.count;
  }
}
