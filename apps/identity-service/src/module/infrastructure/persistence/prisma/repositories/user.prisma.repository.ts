/**
 * User Prisma Repository
 * @module identity-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { UserPrismaMapper, type PrismaUserRow } from '../mappers/user.prisma.mapper.js';
import { UserEntity } from '../../../../domain/entities/user.entity.js';
import type {
  UserRepository,
  UserListOptions,
  UserPaginationResult,
  UserStats,
} from '../../../../domain/repositories/user.repository.interface.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import type { UserEmailVO } from '../../../../domain/value-objects/primitives/user-email.vo.js';

interface UserDelegate {
  findUnique(args: unknown): Promise<PrismaUserRow | null>;
  findFirst(args: unknown): Promise<PrismaUserRow | null>;
  findMany(args?: unknown): Promise<PrismaUserRow[]>;
  create(args: unknown): Promise<PrismaUserRow>;
  update(args: unknown): Promise<PrismaUserRow>;
  delete(args: unknown): Promise<PrismaUserRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: AuthPrismaService) {}

  private get delegate(): UserDelegate {
    return this.prisma.getModel<UserDelegate>('user');
  }

  async findById(id: string): Promise<UserEntity | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? UserPrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: UserIdVO): Promise<UserEntity | null> {
    return this.findById(id.value);
  }

  async findAll(): Promise<readonly UserEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => UserPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id, deletedAt: null } })) > 0;
  }

  async save(entity: UserEntity): Promise<UserEntity> {
    const data = UserPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true } as never,
    });
    const raw = existing
      ? await this.delegate.update({ where: { id: entity.id }, data: data as never })
      : await this.delegate.create({
          data: {
            ...data,
            id: entity.id,
            password: '$2b$12$placeholder000000000000000000000000000000000000000000',
          } as never,
        });
    return UserPrismaMapper.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }

  async softDelete(id: string): Promise<void> {
    return this.delete(id);
  }

  async findByEmail(email: UserEmailVO): Promise<UserEntity | null> {
    return this.findByEmailRaw(email.value);
  }

  async findByEmailRaw(email: string): Promise<UserEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { email, deletedAt: null },
    });
    return raw ? UserPrismaMapper.toDomain(raw) : null;
  }

  async findByPhone(phone: string): Promise<UserEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { phone, deletedAt: null },
    });
    return raw ? UserPrismaMapper.toDomain(raw) : null;
  }

  async findByUsername(_username: string): Promise<UserEntity | null> {
    return null;
  }

  async findPaginated(options: UserListOptions): Promise<UserPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.status) where['status'] = f.status;
    if (f.type) where['type'] = f.type;
    if (f.emailVerified !== undefined) where['emailVerified'] = f.emailVerified;
    if (f.search) {
      where['OR'] = [
        { email: { contains: f.search, mode: 'insensitive' } },
        { name: { contains: f.search, mode: 'insensitive' } },
      ];
    }

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
      items: rows.map((r) => UserPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(): Promise<UserStats> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    const byRole: Record<string, number> = {};
    let activeCount = 0;
    let suspendedCount = 0;
    let verifiedCount = 0;
    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      byType[r.type] = (byType[r.type] ?? 0) + 1;
      byRole[r.role] = (byRole[r.role] ?? 0) + 1;
      if (r.status === 'active') activeCount++;
      if (r.status === 'suspended') suspendedCount++;
      if (r.emailVerified) verifiedCount++;
    }
    return {
      total: rows.length,
      byStatus,
      byType,
      byRole,
      activeCount,
      suspendedCount,
      verifiedCount,
    };
  }

  async findActive(): Promise<readonly UserEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'active', deletedAt: null },
    });
    return rows.map((r) => UserPrismaMapper.toDomain(r));
  }

  async findByRole(role: string): Promise<readonly UserEntity[]> {
    const rows = await this.delegate.findMany({
      where: { role, deletedAt: null },
    });
    return rows.map((r) => UserPrismaMapper.toDomain(r));
  }

  async findInactive(olderThanDays: number): Promise<readonly UserEntity[]> {
    const cutoff = new Date(Date.now() - olderThanDays * 24 * 3600 * 1000);
    const rows = await this.delegate.findMany({
      where: { status: 'inactive', updatedAt: { lt: cutoff }, deletedAt: null } as never,
    });
    return rows.map((r) => UserPrismaMapper.toDomain(r));
  }

  async findUnverified(olderThanHours: number): Promise<readonly UserEntity[]> {
    const cutoff = new Date(Date.now() - olderThanHours * 3600 * 1000);
    const rows = await this.delegate.findMany({
      where: { emailVerified: false, createdAt: { lt: cutoff }, deletedAt: null } as never,
    });
    return rows.map((r) => UserPrismaMapper.toDomain(r));
  }
}
