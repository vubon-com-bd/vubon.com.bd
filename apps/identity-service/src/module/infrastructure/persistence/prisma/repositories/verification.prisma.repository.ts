import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { VerificationPrismaMapper, type PrismaVerificationRow } from '../mappers/verification.prisma.mapper.js';
import { VerificationEntity } from '../../../../domain/entities/verification.entity.js';
import type {
  VerificationRepository,
  VerificationListOptions,
  VerificationPaginationResult,
  VerificationStats,
} from '../../../../domain/repositories/verification.repository.interface.js';
import type { VerificationIdVO } from '../../../../domain/value-objects/primitives/verification-id.vo.js';
import type { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

interface Delegate {
  findUnique(args: unknown): Promise<PrismaVerificationRow | null>;
  findFirst(args: unknown): Promise<PrismaVerificationRow | null>;
  findMany(args?: unknown): Promise<PrismaVerificationRow[]>;
  create(args: unknown): Promise<PrismaVerificationRow>;
  update(args: unknown): Promise<PrismaVerificationRow>;
  delete(args: unknown): Promise<PrismaVerificationRow>;
  count(args?: unknown): Promise<number>;
  deleteMany(args: unknown): Promise<{ count: number }>;
}

@Injectable()
export class VerificationPrismaRepository implements VerificationRepository {
  constructor(private readonly prisma: AuthPrismaService) {}
  private get delegate(): Delegate { return this.prisma.getModel<Delegate>('userVerification'); }

  async findById(id: string) {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? VerificationPrismaMapper.toDomain(raw) : null;
  }
  async findByIdVO(id: VerificationIdVO) { return this.findById(id.value); }
  async findAll() {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => VerificationPrismaMapper.toDomain(r));
  }
  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }
  async save(entity: VerificationEntity): Promise<VerificationEntity> {
    const data = VerificationPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } as never });
    const raw = existing
      ? await this.delegate.update({ where: { id: entity.id }, data: data as never })
      : await this.delegate.create({ data: data as never });
    return VerificationPrismaMapper.toDomain(raw);
  }
  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async softDelete(id: string): Promise<void> { return this.delete(id); }
  async findByAuthId(authId: AuthIdVO) {
    const rows = await this.delegate.findMany({ where: { userId: authId.value, deletedAt: null } });
    return rows.map((r) => VerificationPrismaMapper.toDomain(r));
  }
  async findByUserId(userId: UserIdVO) { return this.findByAuthId({ value: userId.value } as never); }
  async findPendingByTarget(_target: string, _purpose: string) { return null; }
  async findLatestByAuthId(authId: AuthIdVO) {
    const raw = await this.delegate.findFirst({
      where: { userId: authId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    } as never);
    return raw ? VerificationPrismaMapper.toDomain(raw) : null;
  }
  async findPaginated(options: VerificationListOptions): Promise<VerificationPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (options.filter?.authId) where['userId'] = options.filter.authId;
    if (options.filter?.status) where['status'] = options.filter.status;
    const [rows, total] = await Promise.all([
      this.delegate.findMany({ where: where as never, skip: (options.page - 1) * options.limit, take: options.limit }),
      this.delegate.count({ where: where as never }),
    ]);
    return {
      items: rows.map((r) => VerificationPrismaMapper.toDomain(r)),
      total, page: options.page, limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }
  async getStats(): Promise<VerificationStats> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    const byPurpose: Record<string, number> = {};
    let verified = 0, pending = 0;
    for (const r of rows) {
      byPurpose[r.type] = (byPurpose[r.type] ?? 0) + 1;
      if (r.status === 'verified') verified++;
      if (r.status === 'pending') pending++;
    }
    return { total: rows.length, verifiedCount: verified, pendingCount: pending, byPurpose };
  }
  async findExpired(nowMs: number = Date.now()) {
    const rows = await this.delegate.findMany({
      where: { expiresAt: { lt: new Date(nowMs) }, status: 'pending', deletedAt: null } as never,
    });
    return rows.map((r) => VerificationPrismaMapper.toDomain(r));
  }
  async findPendingOlderThan(minutes: number, nowMs: number = Date.now()) {
    const cutoff = new Date(nowMs - minutes * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: { status: 'pending', createdAt: { lt: cutoff }, deletedAt: null } as never,
    });
    return rows.map((r) => VerificationPrismaMapper.toDomain(r));
  }
  async purge(cutoffIso: string): Promise<number> {
    const r = await this.delegate.deleteMany({ where: { createdAt: { lt: new Date(cutoffIso) } } as never });
    return r.count;
  }
}
