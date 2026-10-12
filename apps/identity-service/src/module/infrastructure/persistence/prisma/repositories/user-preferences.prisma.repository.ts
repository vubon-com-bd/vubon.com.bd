import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { UserPreferencesPrismaMapper, type PrismaUserPreferencesRow } from '../mappers/user-preferences.prisma.mapper.js';
import { UserPreferencesEntity } from '../../../../domain/entities/user-preferences.entity.js';
import type { UserPreferencesRepository } from '../../../../domain/repositories/user-preferences.repository.interface.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

interface Delegate {
  findUnique(args: unknown): Promise<PrismaUserPreferencesRow | null>;
  findFirst(args: unknown): Promise<PrismaUserPreferencesRow | null>;
  findMany(args?: unknown): Promise<PrismaUserPreferencesRow[]>;
  create(args: unknown): Promise<PrismaUserPreferencesRow>;
  update(args: unknown): Promise<PrismaUserPreferencesRow>;
  delete(args: unknown): Promise<PrismaUserPreferencesRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class UserPreferencesPrismaRepository implements UserPreferencesRepository {
  constructor(private readonly prisma: AuthPrismaService) {}
  private get delegate(): Delegate { return this.prisma.getModel<Delegate>('userPreferences'); }

  async findById(id: string) {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? UserPreferencesPrismaMapper.toDomain(raw) : null;
  }
  async findByUserId(userId: UserIdVO) { return this.findByUserIdRaw(userId.value); }
  async findByUserIdRaw(userId: string) {
    const raw = await this.delegate.findFirst({ where: { userId, deletedAt: null } });
    return raw ? UserPreferencesPrismaMapper.toDomain(raw) : null;
  }
  async findAll() {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => UserPreferencesPrismaMapper.toDomain(r));
  }
  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }
  async save(entity: UserPreferencesEntity): Promise<UserPreferencesEntity> {
    const data = UserPreferencesPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } as never });
    const raw = existing
      ? await this.delegate.update({ where: { id: entity.id }, data: data as never })
      : await this.delegate.create({ data: data as never });
    return UserPreferencesPrismaMapper.toDomain(raw);
  }
  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async softDelete(id: string): Promise<void> { return this.delete(id); }
  async findWithMarketing() {
    const rows = await this.delegate.findMany({ where: { marketingEmails: true, deletedAt: null } as never });
    return rows.map((r) => UserPreferencesPrismaMapper.toDomain(r));
  }
}
