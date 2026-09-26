/**
 * UserVerificationPrismaRepository
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { UserVerification as PrismaUserVerification } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import type { UserId } from '@vubon/shared-types/common';
import { UserVerificationEntity } from '../../../../domain/entities/user-verification.entity';
import { VerificationCodeVO } from '../../../../domain/value-objects/primitives/verification-code.vo';
import { VerificationTypeVO } from '../../../../domain/value-objects/primitives/verification-type.vo';
import { VerificationStatusVO } from '../../../../domain/value-objects/primitives/verification-status.vo';
import type { UserVerificationRepository } from '../../../../domain/repositories/user-verification.repository.interface';

@Injectable()
export class UserVerificationPrismaRepository
  extends BasePrismaRepository<UserVerificationEntity, PrismaUserVerification, string>
  implements UserVerificationRepository {
  protected readonly model: PrismaDelegate<PrismaUserVerification>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.userVerification as unknown as PrismaDelegate<PrismaUserVerification>;
  }

  protected idOf(domain: UserVerificationEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  protected toDomain(raw: PrismaUserVerification): UserVerificationEntity {
    return UserVerificationEntity.create({
      id: raw.id,
      userId: raw.userId as UserId,
      type: VerificationTypeVO.of(raw.type as 'email' | 'phone' | 'kyc_document'),
      code: VerificationCodeVO.of(raw.code),
      status: VerificationStatusVO.of(raw.status),
      expiresAt: raw.expiresAt ? raw.expiresAt.getTime() : Date.now(),
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: UserVerificationEntity): Record<string, unknown> {
    return {
      id: domain.id,
      userId: domain.userId,
      type: domain.type.value,
      code: '000000',
      status: domain.status.value,
      expiresAt: new Date(domain.expiresAt),
      updatedAt: new Date(),
    };
  }

  async findLatestByUserAndType(
    userId: UserId,
    type: string,
  ): Promise<UserVerificationEntity | null> {
    const raw = await this.prisma.userVerification.findFirst({
      where: { userId, type },
      orderBy: { createdAt: 'desc' },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async deleteExpired(now: number): Promise<number> {
    const result = await this.prisma.userVerification.deleteMany({
      where: { expiresAt: { lt: new Date(now) } },
    });
    return result.count;
  }
}
