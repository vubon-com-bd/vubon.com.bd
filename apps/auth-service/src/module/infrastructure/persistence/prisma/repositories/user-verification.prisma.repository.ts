import { Injectable } from '@nestjs/common';
import { UserVerification as PrismaUserVerification } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { UserVerificationEntity } from '../../../../domain/entities/user-verification.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { VerificationTypeVO } from '../../../../domain/value-objects/primitives/verification-type.vo';
import { VerificationStatusVO } from '../../../../domain/value-objects/primitives/verification-status.vo';
import type { UserVerificationRepository } from '../../../../domain/repositories/user-verification.repository.interface';

@Injectable()
export class UserVerificationPrismaRepository
  extends BasePrismaRepository<UserVerificationEntity, UserIdVO>
  implements UserVerificationRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaUserVerification): UserVerificationEntity {
    return UserVerificationEntity.reconstitute(
      UserIdVO.create(raw.userId),
      {
        userId: UserIdVO.create(raw.userId),
        type: VerificationTypeVO.create(raw.type),
        status: VerificationStatusVO.create(raw.status),
        verifiedAt: raw.verifiedAt,
        expiresAt: raw.expiresAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: UserIdVO): Promise<UserVerificationEntity | null> {
    const raw = await this.prisma.userVerification.findFirst({
      where: { userId: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly UserVerificationEntity[]> {
    const rows = await this.prisma.userVerification.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: UserVerificationEntity): Promise<UserVerificationEntity> {
    const data = {
      userId: entity.userId.value,
      type: entity.type.value,
      status: entity.status.value,
      verifiedAt: entity.verifiedAt,
      expiresAt: entity.expiresAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.userVerification.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: UserIdVO): Promise<void> {
    await this.prisma.userVerification.deleteMany({
      where: { userId: id.value },
    });
  }

  async findByUserId(userId: UserIdVO): Promise<readonly UserVerificationEntity[]> {
    const rows = await this.prisma.userVerification.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByType(
    userId: UserIdVO,
    type: VerificationTypeVO,
  ): Promise<UserVerificationEntity | null> {
    const raw = await this.prisma.userVerification.findFirst({
      where: { userId: userId.value, type: type.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
