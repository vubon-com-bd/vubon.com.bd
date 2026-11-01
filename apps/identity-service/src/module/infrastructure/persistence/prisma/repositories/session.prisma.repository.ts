/**
 * Session Prisma Repository
 * @module identity-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { SessionPrismaMapper, type PrismaSessionRow } from '../mappers/session.prisma.mapper.js';
import { SessionEntity } from '../../../../domain/entities/session.entity.js';
import type {
  SessionRepository,
  SessionListOptions,
  SessionPaginationResult,
  SessionStats,
} from '../../../../domain/repositories/session.repository.interface.js';
import type { SessionIdVO } from '../../../../domain/value-objects/primitives/session-id.vo.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

interface SessionDelegate {
  findUnique(args: unknown): Promise<PrismaSessionRow | null>;
  findFirst(args: unknown): Promise<PrismaSessionRow | null>;
  findMany(args?: unknown): Promise<PrismaSessionRow[]>;
  create(args: unknown): Promise<PrismaSessionRow>;
  update(args: unknown): Promise<PrismaSessionRow>;
  delete(args: unknown): Promise<PrismaSessionRow>;
  count(args?: unknown): Promise<number>;
  updateMany(args: unknown): Promise<{ count: number }>;
}

@Injectable()
export class SessionPrismaRepository implements SessionRepository {
  constructor(private readonly prisma: AuthPrismaService) {}

  private get delegate(): SessionDelegate {
    return this.prisma.getModel<SessionDelegate>('authSession');
  }

  async findById(id: string): Promise<SessionEntity | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? SessionPrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: SessionIdVO): Promise<SessionEntity | null> {
    return this.findById(id.value);
  }

  async findAll(): Promise<readonly SessionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => SessionPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  async save(entity: SessionEntity): Promise<SessionEntity> {
    const data = SessionPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true } as never,
    });
    const raw = existing
      ? await this.delegate.update({ where: { id: entity.id }, data: data as never })
      : await this.delegate.create({ data: { ...data, id: entity.id, token: entity.id } as never });
    return SessionPrismaMapper.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }

  async softDelete(id: string): Promise<void> {
    return this.delete(id);
  }

  async findByUserId(userId: UserIdVO): Promise<readonly SessionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { userId: userId.value, deletedAt: null },
    });
    return rows.map((r) => SessionPrismaMapper.toDomain(r));
  }

  async findActiveByUserId(userId: UserIdVO): Promise<readonly SessionEntity[]> {
    const now = new Date();
    const rows = await this.delegate.findMany({
      where: {
        userId: userId.value,
        revokedAt: null,
        expiry: { gt: now },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => SessionPrismaMapper.toDomain(r));
  }

  async countActiveByUserId(userId: UserIdVO): Promise<number> {
    return this.delegate.count({
      where: {
        userId: userId.value,
        revokedAt: null,
        expiry: { gt: new Date() },
        deletedAt: null,
      } as never,
    });
  }

  async findByAuthId(authId: string): Promise<readonly SessionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { userId: authId, deletedAt: null },
    });
    return rows.map((r) => SessionPrismaMapper.toDomain(r));
  }

  async findPaginated(options: SessionListOptions): Promise<SessionPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.userId) where['userId'] = f.userId;
    if (f.status === 'revoked') where['revokedAt'] = { not: null };
    if (f.status === 'active') where['revokedAt'] = null;

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
      items: rows.map((r) => SessionPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(): Promise<SessionStats> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    const byStatus: Record<string, number> = {};
    let activeCount = 0;
    for (const r of rows) {
      const status = r.revokedAt ? 'revoked' : 'active';
      byStatus[status] = (byStatus[status] ?? 0) + 1;
      if (!r.revokedAt) activeCount++;
    }
    return {
      total: rows.length,
      activeCount,
      byStatus,
      averageDurationSeconds: 0,
    };
  }

  async findExpired(nowMs: number = Date.now()): Promise<readonly SessionEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        expiry: { lt: new Date(nowMs) },
        revokedAt: null,
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => SessionPrismaMapper.toDomain(r));
  }

  async findIdle(idleThresholdMs: number, nowMs: number = Date.now()): Promise<readonly SessionEntity[]> {
    const cutoff = new Date(nowMs - idleThresholdMs);
    const rows = await this.delegate.findMany({
      where: {
        updatedAt: { lt: cutoff },
        revokedAt: null,
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => SessionPrismaMapper.toDomain(r));
  }

  async findOldestByUserId(userId: UserIdVO): Promise<SessionEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { userId: userId.value, deletedAt: null },
      orderBy: { createdAt: 'asc' },
    } as never);
    return raw ? SessionPrismaMapper.toDomain(raw) : null;
  }

  async revokeAllByUserId(userId: UserIdVO, reason: string): Promise<number> {
    const result = await this.delegate.updateMany({
      where: { userId: userId.value, revokedAt: null },
      data: { revokedAt: new Date(), revokeReason: reason } as never,
    });
    return result.count;
  }
}
