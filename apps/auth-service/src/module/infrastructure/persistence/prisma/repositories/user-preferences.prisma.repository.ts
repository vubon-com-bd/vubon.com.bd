/**
 * UserPreferencesPrismaRepository
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { UserPreferences as PrismaUserPreferences } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import type { UserId } from '@vubon/shared-types/common';
import { UserPreferencesEntity } from '../../../../domain/entities/user-preferences.entity';
import type { UserPreferencesRepository } from '../../../../domain/repositories/user-preferences.repository.interface';

@Injectable()
export class UserPreferencesPrismaRepository
  extends BasePrismaRepository<UserPreferencesEntity, PrismaUserPreferences, UserId>
  implements UserPreferencesRepository {
  protected readonly model: PrismaDelegate<PrismaUserPreferences>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.userPreferences as unknown as PrismaDelegate<PrismaUserPreferences>;
  }

  protected idOf(domain: UserPreferencesEntity): UserId {
    return domain.userId;
  }

  protected whereForId(id: UserId): Record<string, unknown> {
    return { userId: id };
  }

  protected toDomain(raw: PrismaUserPreferences): UserPreferencesEntity {
    return UserPreferencesEntity.create({
      id: raw.userId as UserId,
      userId: raw.userId as UserId,
      theme: 'system',
      currency: 'BDT',
      dateFormat: 'DD/MM/YYYY',
      reduceMotion: false,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: UserPreferencesEntity): Record<string, unknown> {
    return {
      userId: domain.userId,
      marketingEmails: false,
      productUpdates: true,
      orderUpdates: true,
      securityAlerts: true,
      newsletter: false,
      updatedAt: new Date(),
    };
  }

  async findByUserId(userId: UserId): Promise<UserPreferencesEntity | null> {
    const raw = await this.prisma.userPreferences.findUnique({
      where: { userId },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
