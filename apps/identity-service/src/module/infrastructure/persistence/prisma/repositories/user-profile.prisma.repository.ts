/**
 * User Profile Prisma Repository
 * @module identity-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { UserProfilePrismaMapper, type PrismaUserProfileRow } from '../mappers/user-profile.prisma.mapper.js';
import { UserProfileEntity } from '../../../../domain/entities/user-profile.entity.js';
import type { UserProfileRepository } from '../../../../domain/repositories/user-profile.repository.interface.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

interface Delegate {
  findUnique(args: unknown): Promise<PrismaUserProfileRow | null>;
  findFirst(args: unknown): Promise<PrismaUserProfileRow | null>;
  findMany(args?: unknown): Promise<PrismaUserProfileRow[]>;
  create(args: unknown): Promise<PrismaUserProfileRow>;
  update(args: unknown): Promise<PrismaUserProfileRow>;
  delete(args: unknown): Promise<PrismaUserProfileRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class UserProfilePrismaRepository implements UserProfileRepository {
  constructor(private readonly prisma: AuthPrismaService) {}
  private get delegate(): Delegate { return this.prisma.getModel<Delegate>('userProfile'); }

  async findById(id: string) {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? UserProfilePrismaMapper.toDomain(raw) : null;
  }
  async findByUserId(userId: UserIdVO) { return this.findByUserIdRaw(userId.value); }
  async findByUserIdRaw(userId: string) {
    const raw = await this.delegate.findFirst({ where: { userId, deletedAt: null } });
    return raw ? UserProfilePrismaMapper.toDomain(raw) : null;
  }
  async findAll() {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => UserProfilePrismaMapper.toDomain(r));
  }
  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }
  async save(entity: UserProfileEntity): Promise<UserProfileEntity> {
    const data = UserProfilePrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } as never });
    const raw = existing
      ? await this.delegate.update({ where: { id: entity.id }, data: data as never })
      : await this.delegate.create({ data: data as never });
    return UserProfilePrismaMapper.toDomain(raw);
  }
  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async softDelete(id: string): Promise<void> { return this.delete(id); }
  async findIncomplete() { return []; }
}
