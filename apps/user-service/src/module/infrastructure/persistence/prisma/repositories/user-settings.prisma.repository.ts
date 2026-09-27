/**
 * UserSettingsPrismaRepository
 */
import { Injectable } from '@nestjs/common';
import type { UserSetting as PrismaUserSetting } from '@prisma/client';
import { PrismaService } from '../prisma.service.js';
import type { UserSettingsRepository } from '@domain/repositories/user-settings.repository.interface';
import { UserSettingsEntity } from '@domain/entities/user-settings.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { SettingKeyVO } from '@domain/value-objects/primitives/setting-key.vo';
import { SettingValueVO } from '@domain/value-objects/primitives/setting-value.vo';

@Injectable()
export class UserSettingsPrismaRepository implements UserSettingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildEntity(rows: PrismaUserSetting[]): UserSettingsEntity {
    const first = rows[0];
    const userId = first ? first.userId : '';
    const id = first ? first.userId : '';
    const createdAt = first ? first.createdAt.toISOString() : new Date().toISOString();
    const updatedAt = first ? first.updatedAt.toISOString() : createdAt;

    return UserSettingsEntity.reconstitute({
      id,
      createdAt,
      updatedAt,
      deletedAt: null,
      props: {
        userId,
        entries: rows.map((r) => ({
          key: SettingKeyVO.create(r.key),
          value: SettingValueVO.create(r.value),
        })),
      },
    });
  }

  async findById(id: string): Promise<UserSettingsEntity | null> {
    // id here = userId (settings is not a single aggregate; we key by user)
    const rows = await this.prisma.userSetting.findMany({ where: { userId: id } });
    return rows.length > 0 ? this.buildEntity(rows) : null;
  }

  async findAll(): Promise<readonly UserSettingsEntity[]> {
    const rows = await this.prisma.userSetting.findMany();
    const byUser = new Map<string, PrismaUserSetting[]>();
    for (const r of rows) {
      const arr = byUser.get(r.userId) ?? [];
      arr.push(r);
      byUser.set(r.userId, arr);
    }
    return [...byUser.values()].map((r) => this.buildEntity(r));
  }

  async save(entity: UserSettingsEntity): Promise<UserSettingsEntity> {
    const userId = entity.userId;
    // Delete-and-recreate is simplest for settings aggregate
    await this.prisma.userSetting.deleteMany({ where: { userId } });

    // Get keys from entity — since we don't expose entries, pull via reflection
    const knownKeys = ['theme', 'language', 'timezone', 'currency', 'date_format', 'time_format', 'notifications', 'two_factor'];
    const inserts: { userId: string; key: string; value: string }[] = [];
    for (const key of knownKeys) {
      const value = entity.get(key);
      if (value) {
        inserts.push({ userId, key, value: value.value });
      }
    }
    if (inserts.length > 0) {
      await this.prisma.userSetting.createMany({ data: inserts });
    }
    return (await this.findByUserId(UserIdVO.create(userId))) ?? entity;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.userSetting.deleteMany({ where: { userId: id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.userSetting.count({ where: { userId: id } });
    return count > 0;
  }

  async findByUserId(userId: UserIdVO): Promise<UserSettingsEntity | null> {
    const rows = await this.prisma.userSetting.findMany({
      where: { userId: userId.value },
    });
    return rows.length > 0 ? this.buildEntity(rows) : null;
  }

  async existsByUserId(userId: UserIdVO): Promise<boolean> {
    const count = await this.prisma.userSetting.count({
      where: { userId: userId.value },
    });
    return count > 0;
  }
}
