import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { UserVerificationPrismaMapper, type PrismaUserVerificationRow } from '../mappers/user-verification.prisma.mapper.js';
import { UserVerificationEntity } from '../../../../domain/entities/user-verification.entity.js';
import type {
  UserVerificationRepository,
  UserVerificationStats,
} from '../../../../domain/repositories/user-verification.repository.interface.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

interface Delegate {
  findUnique(args: unknown): Promise<PrismaUserVerificationRow | null>;
  findFirst(args: unknown): Promise<PrismaUserVerificationRow | null>;
  findMany(args?: unknown): Promise<PrismaUserVerificationRow[]>;
  create(args: unknown): Promise<PrismaUserVerificationRow>;
  update(args: unknown): Promise<PrismaUserVerificationRow>;
  delete(args: unknown): Promise<PrismaUserVerificationRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class UserVerificationPrismaRepository implements UserVerificationRepository {
  constructor(private readonly prisma: AuthPrismaService) {}
  private get delegate(): Delegate { return this.prisma.getModel<Delegate>('userVerification'); }

  async findById(id: string) {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? UserVerificationPrismaMapper.toDomain(raw) : null;
  }
  async findByUserId(userId: UserIdVO) { return this.findByUserIdRaw(userId.value); }
  async findByUserIdRaw(userId: string) {
    const raw = await this.delegate.findFirst({ where: { userId, deletedAt: null } });
    return raw ? UserVerificationPrismaMapper.toDomain(raw) : null;
  }
  async findAll() {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => UserVerificationPrismaMapper.toDomain(r));
  }
  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }
  async save(entity: UserVerificationEntity): Promise<UserVerificationEntity> {
    const data = UserVerificationPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } as never });
    const raw = existing
      ? await this.delegate.update({ where: { id: entity.id }, data: data as never })
      : await this.delegate.create({ data: data as never });
    return UserVerificationPrismaMapper.toDomain(raw);
  }
  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async softDelete(id: string): Promise<void> { return this.delete(id); }
  async getStats(): Promise<UserVerificationStats> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    let e = 0, p = 0, i = 0;
    for (const r of rows) {
      if (r.type === 'email' && r.status === 'verified') e++;
      if (r.type === 'phone' && r.status === 'verified') p++;
    }
    return {
      total: rows.length,
      emailVerifiedCount: e,
      phoneVerifiedCount: p,
      identityVerifiedCount: i,
      fullyVerifiedCount: 0,
    };
  }
  async findUnverifiedUsers() {
    const rows = await this.delegate.findMany({ where: { status: { not: 'verified' }, deletedAt: null } as never });
    return rows.map((r) => UserVerificationPrismaMapper.toDomain(r));
  }
}
