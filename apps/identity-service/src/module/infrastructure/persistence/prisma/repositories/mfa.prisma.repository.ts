/**
 * MFA Prisma Repository
 * @module identity-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { MfaPrismaMapper, type PrismaMfaRow } from '../mappers/mfa.prisma.mapper.js';
import { MfaEntity } from '../../../../domain/entities/mfa.entity.js';
import type {
  MfaRepository,
  MfaListOptions,
  MfaPaginationResult,
  MfaStats,
} from '../../../../domain/repositories/mfa.repository.interface.js';
import type { MfaIdVO } from '../../../../domain/value-objects/primitives/mfa-id.vo.js';
import type { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';

interface MfaDelegate {
  findUnique(args: unknown): Promise<PrismaMfaRow | null>;
  findFirst(args: unknown): Promise<PrismaMfaRow | null>;
  findMany(args?: unknown): Promise<PrismaMfaRow[]>;
  create(args: unknown): Promise<PrismaMfaRow>;
  update(args: unknown): Promise<PrismaMfaRow>;
  delete(args: unknown): Promise<PrismaMfaRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class MfaPrismaRepository implements MfaRepository {
  constructor(private readonly prisma: AuthPrismaService) {}

  private get delegate(): MfaDelegate {
    return this.prisma.getModel<MfaDelegate>('authMfa');
  }

  async findById(id: string): Promise<MfaEntity | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? MfaPrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: MfaIdVO): Promise<MfaEntity | null> {
    return this.findById(id.value);
  }

  async findAll(): Promise<readonly MfaEntity[]> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => MfaPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }

  async save(entity: MfaEntity): Promise<MfaEntity> {
    const data = MfaPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true } as never,
    });
    const raw = existing
      ? await this.delegate.update({ where: { id: entity.id }, data: data as never })
      : await this.delegate.create({ data: data as never });
    return MfaPrismaMapper.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }

  async softDelete(id: string): Promise<void> {
    return this.delete(id);
  }

  async findByAuthId(authId: AuthIdVO): Promise<readonly MfaEntity[]> {
    const rows = await this.delegate.findMany({
      where: { userId: authId.value, deletedAt: null },
    });
    return rows.map((r) => MfaPrismaMapper.toDomain(r));
  }

  async findPrimaryByAuthId(authId: AuthIdVO): Promise<MfaEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { userId: authId.value, deletedAt: null },
    });
    return raw ? MfaPrismaMapper.toDomain(raw) : null;
  }

  async findEnabledByAuthId(authId: AuthIdVO): Promise<MfaEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { userId: authId.value, enabledAt: { not: null }, deletedAt: null } as never,
    });
    return raw ? MfaPrismaMapper.toDomain(raw) : null;
  }

  async findPaginated(options: MfaListOptions): Promise<MfaPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.authId) where['userId'] = f.authId;
    if (f.enabled === true) where['enabledAt'] = { not: null };

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where: where as never,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where: where as never }),
    ]);

    return {
      items: rows.map((r) => MfaPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(): Promise<MfaStats> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    const byMethod: Record<string, number> = {};
    let enabledCount = 0;
    let verified = 0;
    for (const r of rows) {
      byMethod[r.type] = (byMethod[r.type] ?? 0) + 1;
      if (r.enabledAt) enabledCount++;
      if (r.lastVerifiedAt) verified++;
    }
    return {
      total: rows.length,
      enabledCount,
      byMethod,
      byVerified: { yes: verified, no: rows.length - verified },
    };
  }

  async findUnverified(olderThanHours: number): Promise<readonly MfaEntity[]> {
    const cutoff = new Date(Date.now() - olderThanHours * 3600 * 1000);
    const rows = await this.delegate.findMany({
      where: { lastVerifiedAt: null, createdAt: { lt: cutoff }, deletedAt: null } as never,
    });
    return rows.map((r) => MfaPrismaMapper.toDomain(r));
  }

  async findFailing(threshold: number): Promise<readonly MfaEntity[]> {
    // no failedAttempts column on AuthMfa — return []
    void threshold;
    return [];
  }
}
