import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { SocialAccountPrismaMapper, type PrismaSocialAccountRow } from '../mappers/social-account.prisma.mapper.js';
import { SocialAccountEntity } from '../../../../domain/entities/social-account.entity.js';
import type {
  SocialAccountRepository,
  SocialAccountListOptions,
  SocialAccountPaginationResult,
  SocialAccountStats,
} from '../../../../domain/repositories/social-account.repository.interface.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

interface Delegate {
  findUnique(args: unknown): Promise<PrismaSocialAccountRow | null>;
  findFirst(args: unknown): Promise<PrismaSocialAccountRow | null>;
  findMany(args?: unknown): Promise<PrismaSocialAccountRow[]>;
  create(args: unknown): Promise<PrismaSocialAccountRow>;
  update(args: unknown): Promise<PrismaSocialAccountRow>;
  delete(args: unknown): Promise<PrismaSocialAccountRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class SocialAccountPrismaRepository implements SocialAccountRepository {
  constructor(private readonly prisma: AuthPrismaService) {}
  private get delegate(): Delegate { return this.prisma.getModel<Delegate>('authSocial'); }

  async findById(id: string) {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? SocialAccountPrismaMapper.toDomain(raw) : null;
  }
  async findAll() {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => SocialAccountPrismaMapper.toDomain(r));
  }
  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }
  async save(entity: SocialAccountEntity): Promise<SocialAccountEntity> {
    const data = SocialAccountPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } as never });
    const raw = existing
      ? await this.delegate.update({ where: { id: entity.id }, data: data as never })
      : await this.delegate.create({ data: data as never });
    return SocialAccountPrismaMapper.toDomain(raw);
  }
  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async softDelete(id: string): Promise<void> { return this.delete(id); }
  async findByUserId(userId: UserIdVO) {
    const rows = await this.delegate.findMany({ where: { userId: userId.value, deletedAt: null } });
    return rows.map((r) => SocialAccountPrismaMapper.toDomain(r));
  }
  async findByProviderAndProviderUserId(provider: string, providerUserId: string) {
    const raw = await this.delegate.findFirst({ where: { provider, providerUserId, deletedAt: null } as never });
    return raw ? SocialAccountPrismaMapper.toDomain(raw) : null;
  }
  async findByUserIdAndProvider(userId: UserIdVO, provider: string) {
    const raw = await this.delegate.findFirst({ where: { userId: userId.value, provider, deletedAt: null } as never });
    return raw ? SocialAccountPrismaMapper.toDomain(raw) : null;
  }
  async findPaginated(options: SocialAccountListOptions): Promise<SocialAccountPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (options.filter?.userId) where['userId'] = options.filter.userId;
    const [rows, total] = await Promise.all([
      this.delegate.findMany({ where: where as never, skip: (options.page - 1) * options.limit, take: options.limit }),
      this.delegate.count({ where: where as never }),
    ]);
    return {
      items: rows.map((r) => SocialAccountPrismaMapper.toDomain(r)),
      total, page: options.page, limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }
  async getStats(): Promise<SocialAccountStats> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    const byProvider: Record<string, number> = {};
    let activeCount = 0;
    for (const r of rows) {
      byProvider[r.provider] = (byProvider[r.provider] ?? 0) + 1;
      if (r.isActive) activeCount++;
    }
    return { total: rows.length, activeCount, byProvider };
  }
  async findInactive(olderThanDays: number) {
    const cutoff = new Date(Date.now() - olderThanDays * 24 * 3600 * 1000);
    const rows = await this.delegate.findMany({
      where: { lastUsedAt: { lt: cutoff }, deletedAt: null } as never,
    });
    return rows.map((r) => SocialAccountPrismaMapper.toDomain(r));
  }
}
