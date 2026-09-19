import { Injectable } from '@nestjs/common';
import { UserKyc as PrismaUserKyc } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { UserKycEntity, type KycStatus } from '../../../../domain/entities/user-kyc.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { UserKycRepository } from '../../../../domain/repositories/user-kyc.repository.interface';

@Injectable()
export class UserKycPrismaRepository
  extends BasePrismaRepository<UserKycEntity, UserIdVO>
  implements UserKycRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaUserKyc): UserKycEntity {
    return UserKycEntity.reconstitute(
      UserIdVO.create(raw.userId),
      {
        userId: UserIdVO.create(raw.userId),
        status: raw.status as KycStatus,
        documentType: raw.documentType,
        documentNumber: raw.documentNumber,
        documentUrl: raw.documentUrl,
        submittedAt: raw.submittedAt,
        reviewedAt: raw.reviewedAt,
        rejectionReason: raw.rejectionReason,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: UserIdVO): Promise<UserKycEntity | null> {
    const raw = await this.prisma.userKyc.findUnique({
      where: { userId: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly UserKycEntity[]> {
    const rows = await this.prisma.userKyc.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: UserKycEntity): Promise<UserKycEntity> {
    const data = {
      status: entity.status,
      documentType: entity.documentType,
      documentNumber: entity.documentNumber,
      documentUrl: entity.documentUrl,
      submittedAt: entity.submittedAt,
      reviewedAt: entity.reviewedAt,
      rejectionReason: entity.rejectionReason,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.userKyc.upsert({
      where: { userId: entity.userId.value },
      create: { id: entity.id.value, userId: entity.userId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: UserIdVO): Promise<void> {
    await this.prisma.userKyc.delete({ where: { userId: id.value } });
  }

  async findByUserId(userId: UserIdVO): Promise<UserKycEntity | null> {
    const raw = await this.prisma.userKyc.findUnique({
      where: { userId: userId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
