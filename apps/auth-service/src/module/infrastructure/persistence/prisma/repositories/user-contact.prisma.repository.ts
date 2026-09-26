/**
 * UserContactPrismaRepository
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { UserContact as PrismaUserContact } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import type { UserId } from '@vubon/shared-types/common';
import { UserContactEntity } from '../../../../domain/entities/user-contact.entity';
import { UserEmailVO } from '../../../../domain/value-objects/primitives/user-email.vo';
import { UserPhoneVO } from '../../../../domain/value-objects/primitives/user-phone.vo';
import type { UserContactRepository } from '../../../../domain/repositories/user-contact.repository.interface';

@Injectable()
export class UserContactPrismaRepository
  extends BasePrismaRepository<UserContactEntity, PrismaUserContact, string>
  implements UserContactRepository {
  protected readonly model: PrismaDelegate<PrismaUserContact>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.userContact as unknown as PrismaDelegate<PrismaUserContact>;
  }

  protected idOf(domain: UserContactEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  protected toDomain(raw: PrismaUserContact): UserContactEntity {
    return UserContactEntity.create({
      id: raw.id,
      userId: raw.userId as UserId,
      email: raw.email ? UserEmailVO.of(raw.email) : undefined,
      phone: raw.phone ? UserPhoneVO.of(raw.phone) : undefined,
      verified: false,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: UserContactEntity): Record<string, unknown> {
    return {
      id: domain.id,
      userId: domain.userId,
      email: domain.email?.value ?? '',
      phone: domain.phone?.value ?? '',
      updatedAt: new Date(),
    };
  }

  async findByUserId(userId: UserId): Promise<readonly UserContactEntity[]> {
    const rows = await this.prisma.userContact.findMany({
      where: { userId },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findVerifiedByUserId(userId: UserId): Promise<readonly UserContactEntity[]> {
    const rows = await this.prisma.userContact.findMany({
      where: { userId },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
