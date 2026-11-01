import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { UserKycPrismaMapper, type PrismaUserKycRow } from '../mappers/user-kyc.prisma.mapper.js';
import { UserKycEntity } from '../../../../domain/entities/user-kyc.entity.js';
import type {
  UserKycRepository,
  UserKycListOptions,
  UserKycPaginationResult,
  UserKycStats,
} from '../../../../domain/repositories/user-kyc.repository.interface.js';
import type { KycIdVO } from '../../../../domain/value-objects/primitives/kyc-id.vo.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

interface Delegate {
  findUnique(args: unknown): Promise<PrismaUserKycRow | null>;
  findFirst(args: unknown): Promise<PrismaUserKycRow | null>;
  findMany(args?: unknown): Promise<PrismaUserKycRow[]>;
  create(args: unknown): Promise<PrismaUserKycRow>;
  update(args: unknown): Promise<PrismaUserKycRow>;
  delete(args: unknown): Promise<PrismaUserKycRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class UserKycPrismaRepository implements UserKycRepository {
  constructor(private readonly prisma: AuthPrismaService) {}
  private get delegate(): Delegate { return this.prisma.getModel<Delegate>('userKyc'); }

  async findById(id: string) {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? UserKycPrismaMapper.toDomain(raw) : null;
  }
  async findByIdVO(id: KycIdVO) { return this.findById(id.value); }
  async findByUserId(userId: UserIdVO) { return this.findByUserIdRaw(userId.value); }
  async findByUserIdRaw(userId: string) {
    const raw = await this.delegate.findFirst({ where: { userId, deletedAt: null } });
    return raw ? UserKycPrismaMapper.toDomain(raw) : null;
  }
  async findAll() {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => UserKycPrismaMapper.toDomain(r));
  }
  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }
  async save(entity: UserKycEntity): Promise<UserKycEntity> {
    const data = UserKycPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } as never });
    const raw = existing
      ? await this.delegate.update({ where: { id: entity.id }, data: data as never })
      : await this.delegate.create({ data: data as never });
    return UserKycPrismaMapper.toDomain(raw);
  }
  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async softDelete(id: string): Promise<void> { return this.delete(id); }
  async findPaginated(options: UserKycListOptions): Promise<UserKycPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (options.filter?.status) where['status'] = options.filter.status;
    const [rows, total] = await Promise.all([
      this.delegate.findMany({ where: where as never, skip: (options.page - 1) * options.limit, take: options.limit }),
      this.delegate.count({ where: where as never }),
    ]);
    return {
      items: rows.map((r) => UserKycPrismaMapper.toDomain(r)),
      total, page: options.page, limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }
  async getStats(): Promise<UserKycStats> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    const byStatus: Record<string, number> = {};
    let pending = 0, verified = 0, rejected = 0;
    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      if (r.status === 'pending') pending++;
      else if (r.status === 'verified') verified++;
      else if (r.status === 'rejected') rejected++;
    }
    return { total: rows.length, byStatus, pendingCount: pending, verifiedCount: verified, rejectedCount: rejected };
  }
  async findPending(olderThanHours: number) {
    const cutoff = new Date(Date.now() - olderThanHours * 3600 * 1000);
    const rows = await this.delegate.findMany({ where: { status: 'pending', submittedAt: { lt: cutoff }, deletedAt: null } as never });
    return rows.map((r) => UserKycPrismaMapper.toDomain(r));
  }
  async findExpiring(withinDays: number) {
    const cutoff = new Date(Date.now() + withinDays * 24 * 3600 * 1000);
    const rows = await this.delegate.findMany({ where: { expiresAt: { lt: cutoff }, deletedAt: null } as never });
    return rows.map((r) => UserKycPrismaMapper.toDomain(r));
  }
}
