/**
 * UserPreferencesPrismaRepository
 */
import { Injectable } from '@nestjs/common';
import type { UserPreference as PrismaUserPreference } from '@prisma/client';
import { PrismaService } from '../prisma.service.js';
import type { UserPreferencesRepository } from '@domain/repositories/user-preferences.repository.interface';
import { UserPreferencesEntity } from '@domain/entities/user-preferences.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { PreferenceKeyVO } from '@domain/value-objects/primitives/preference-key.vo';
import { PreferenceValueVO } from '@domain/value-objects/primitives/preference-value.vo';

@Injectable()
export class UserPreferencesPrismaRepository implements UserPreferencesRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildEntity(rows: PrismaUserPreference[]): UserPreferencesEntity {
    const first = rows[0];
    const userId = first ? first.userId : '';
    const createdAt = first ? first.createdAt.toISOString() : new Date().toISOString();
    const updatedAt = first ? first.updatedAt.toISOString() : createdAt;

    return UserPreferencesEntity.reconstitute({
      id: userId,
      createdAt,
      updatedAt,
      deletedAt: null,
      props: {
        userId,
        entries: rows.map((r) => ({
          key: PreferenceKeyVO.create(r.key),
          value: PreferenceValueVO.create(r.value),
        })),
      },
    });
  }

  async findById(id: string): Promise<UserPreferencesEntity | null> {
    const rows = await this.prisma.userPreference.findMany({
      where: { userId: id },
    });
    return rows.length > 0 ? this.buildEntity(rows) : null;
  }

  async findAll(): Promise<readonly UserPreferencesEntity[]> {
    const rows = await this.prisma.userPreference.findMany();
    const byUser = new Map<string, PrismaUserPreference[]>();
    for (const r of rows) {
      const arr = byUser.get(r.userId) ?? [];
      arr.push(r);
      byUser.set(r.userId, arr);
    }
    return [...byUser.values()].map((r) => this.buildEntity(r));
  }

  async save(entity: UserPreferencesEntity): Promise<UserPreferencesEntity> {
    const userId = entity.userId;
    await this.prisma.userPreference.deleteMany({ where: { userId } });

    const knownKeys = [
      'newsletter',
      'promotions',
      'order_updates',
      'product_recommendations',
      'security_alerts',
    ];
    const inserts: { userId: string; key: string; value: string }[] = [];
    for (const key of knownKeys) {
      const value = entity.get(key);
      if (value) inserts.push({ userId, key, value: value.value });
    }
    if (inserts.length > 0) {
      await this.prisma.userPreference.createMany({ data: inserts });
    }
    return (await this.findByUserId(UserIdVO.create(userId))) ?? entity;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.userPreference.deleteMany({ where: { userId: id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.userPreference.count({ where: { userId: id } });
    return count > 0;
  }

  async findByUserId(userId: UserIdVO): Promise<UserPreferencesEntity | null> {
    const rows = await this.prisma.userPreference.findMany({
      where: { userId: userId.value },
    });
    return rows.length > 0 ? this.buildEntity(rows) : null;
  }

  async existsByUserId(userId: UserIdVO): Promise<boolean> {
    const count = await this.prisma.userPreference.count({
      where: { userId: userId.value },
    });
    return count > 0;
  }
}
