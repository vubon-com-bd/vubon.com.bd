/**
 * Token Prisma Repository
 * @module identity-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { TokenPrismaMapper, type PrismaTokenRow } from '../mappers/token.prisma.mapper.js';
import { TokenEntity } from '../../../../domain/entities/token.entity.js';
import type {
  TokenRepository,
  TokenListOptions,
  TokenPaginationResult,
  TokenStats,
} from '../../../../domain/repositories/token.repository.interface.js';
import type { TokenIdVO } from '../../../../domain/value-objects/primitives/token-id.vo.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

interface TokenDelegate {
  findUnique(args: unknown): Promise<PrismaTokenRow | null>;
  findFirst(args: unknown): Promise<PrismaTokenRow | null>;
  findMany(args?: unknown): Promise<PrismaTokenRow[]>;
  create(args: unknown): Promise<PrismaTokenRow>;
  update(args: unknown): Promise<PrismaTokenRow>;
  delete(args: unknown): Promise<PrismaTokenRow>;
  count(args?: unknown): Promise<number>;
  updateMany(args: unknown): Promise<{ count: number }>;
  deleteMany(args: unknown): Promise<{ count: number }>;
}

@Injectable()
export class TokenPrismaRepository implements TokenRepository {
  constructor(private readonly prisma: AuthPrismaService) {}

  private get delegate(): TokenDelegate {
    return this.prisma.getModel<TokenDelegate>('authToken');
  }

  async findById(id: string): Promise<TokenEntity | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? TokenPrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: TokenIdVO): Promise<TokenEntity | null> {
    return this.findById(id.value);
  }

  async findAll(): Promise<readonly TokenEntity[]> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => TokenPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  async save(entity: TokenEntity): Promise<TokenEntity> {
    const data = TokenPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true } as never,
    });
    const raw = existing
      ? await this.delegate.update({ where: { id: entity.id }, data: data as never })
      : await this.delegate.create({ data: data as never });
    return TokenPrismaMapper.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }

  async softDelete(id: string): Promise<void> {
    return this.delete(id);
  }

  async findByJti(jti: string): Promise<TokenEntity | null> {
    return this.findById(jti);
  }

  async findByUserId(userId: UserIdVO): Promise<readonly TokenEntity[]> {
    const rows = await this.delegate.findMany({
      where: { userId: userId.value, deletedAt: null },
    });
    return rows.map((r) => TokenPrismaMapper.toDomain(r));
  }

  async findBySessionId(sessionId: string): Promise<readonly TokenEntity[]> {
    return this.findByUserId({ value: sessionId } as never);
  }

  async findPaginated(options: TokenListOptions): Promise<TokenPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.userId) where['userId'] = f.userId;
    if (f.type) where['tokenType'] = f.type;
    if (f.revoked === true) where['revokedAt'] = { not: null };
    if (f.revoked === false) where['revokedAt'] = null;

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
      items: rows.map((r) => TokenPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(): Promise<TokenStats> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    const byType: Record<string, number> = {};
    let activeCount = 0;
    let revokedCount = 0;
    for (const r of rows) {
      byType[r.tokenType] = (byType[r.tokenType] ?? 0) + 1;
      if (r.revokedAt) revokedCount++;
      else activeCount++;
    }
    return { total: rows.length, activeCount, revokedCount, byType };
  }

  async findExpired(nowMs: number = Date.now()): Promise<readonly TokenEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        expiry: { lt: new Date(nowMs) },
        revokedAt: null,
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => TokenPrismaMapper.toDomain(r));
  }

  async findUnusedExpired(nowMs: number = Date.now()): Promise<readonly TokenEntity[]> {
    return this.findExpired(nowMs);
  }

  async revokeAllByUserId(userId: UserIdVO, _reason: string): Promise<number> {
    const result = await this.delegate.updateMany({
      where: { userId: userId.value, revokedAt: null },
      data: { revokedAt: new Date() } as never,
    });
    return result.count;
  }

  async revokeAllBySessionId(_sessionId: string, _reason: string): Promise<number> {
    return 0;
  }

  async purge(cutoffIso: string): Promise<number> {
    const result = await this.delegate.deleteMany({
      where: { expiry: { lt: new Date(cutoffIso) } } as never,
    });
    return result.count;
  }
}
