import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { UserSettingsPrismaMapper, type PrismaUserSettingsRow } from '../mappers/user-settings.prisma.mapper.js';
import { UserSettingsEntity } from '../../../../domain/entities/user-settings.entity.js';
import type { UserSettingsRepository } from '../../../../domain/repositories/user-settings.repository.interface.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

interface Delegate {
  findUnique(args: unknown): Promise<PrismaUserSettingsRow | null>;
  findFirst(args: unknown): Promise<PrismaUserSettingsRow | null>;
  findMany(args?: unknown): Promise<PrismaUserSettingsRow[]>;
  create(args: unknown): Promise<PrismaUserSettingsRow>;
  update(args: unknown): Promise<PrismaUserSettingsRow>;
  delete(args: unknown): Promise<PrismaUserSettingsRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class UserSettingsPrismaRepository implements UserSettingsRepository {
  constructor(private readonly prisma: AuthPrismaService) {}
  private get delegate(): Delegate { return this.prisma.getModel<Delegate>('userSettings'); }

  async findById(id: string) {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? UserSettingsPrismaMapper.toDomain(raw) : null;
  }
  async findByUserId(userId: UserIdVO) { return this.findByUserIdRaw(userId.value); }
  async findByUserIdRaw(userId: string) {
    const raw = await this.delegate.findFirst({ where: { userId, deletedAt: null } });
    return raw ? UserSettingsPrismaMapper.toDomain(raw) : null;
  }
  async findAll() {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => UserSettingsPrismaMapper.toDomain(r));
  }
  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }
  async save(entity: UserSettingsEntity): Promise<UserSettingsEntity> {
    const data = UserSettingsPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } as never });
    const raw = existing
      ? await this.delegate.update({ where: { id: entity.id }, data: data as never })
      : await this.delegate.create({ data: data as never });
    return UserSettingsPrismaMapper.toDomain(raw);
  }
  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async softDelete(id: string): Promise<void> { return this.delete(id); }
}
