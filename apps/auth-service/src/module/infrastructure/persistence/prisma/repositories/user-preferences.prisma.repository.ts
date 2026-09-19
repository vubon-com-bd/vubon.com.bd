import { Injectable } from '@nestjs/common';
import { UserPreferences as PrismaUserPreferences } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { UserPreferencesEntity } from '../../../../domain/entities/user-preferences.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { UserPreferencesRepository } from '../../../../domain/repositories/user-preferences.repository.interface';

@Injectable()
export class UserPreferencesPrismaRepository
  extends BasePrismaRepository<UserPreferencesEntity, UserIdVO>
  implements UserPreferencesRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaUserPreferences): UserPreferencesEntity {
    return UserPreferencesEntity.reconstitute(
      UserIdVO.create(raw.userId),
      {
        userId: UserIdVO.create(raw.userId),
        marketingEmails: raw.marketingEmails,
        productUpdates: raw.productUpdates,
        orderUpdates: raw.orderUpdates,
        securityAlerts: raw.securityAlerts,
        newsletter: raw.newsletter,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: UserIdVO): Promise<UserPreferencesEntity | null> {
    const raw = await this.prisma.userPreferences.findUnique({
      where: { userId: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly UserPreferencesEntity[]> {
    const rows = await this.prisma.userPreferences.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: UserPreferencesEntity): Promise<UserPreferencesEntity> {
    const data = {
      marketingEmails: entity.marketingEmails,
      productUpdates: entity.productUpdates,
      orderUpdates: entity.orderUpdates,
      securityAlerts: entity.securityAlerts,
      newsletter: entity.newsletter,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.userPreferences.upsert({
      where: { userId: entity.userId.value },
      create: { id: entity.id.value, userId: entity.userId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: UserIdVO): Promise<void> {
    await this.prisma.userPreferences.delete({ where: { userId: id.value } });
  }

  async findByUserId(userId: UserIdVO): Promise<UserPreferencesEntity | null> {
    const raw = await this.prisma.userPreferences.findUnique({
      where: { userId: userId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
