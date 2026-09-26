import { Injectable } from '@nestjs/common';
import { UserKyc as PrismaUserKyc } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { UserKycEntity } from '../../../../domain/entities/user-kyc.entity';
import { KycIdVO } from '../../../../domain/value-objects/primitives/kyc-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { KycDocumentVO } from '../../../../domain/value-objects/primitives/kyc-document.vo';
import { KycStatusVO } from '../../../../domain/value-objects/primitives/kyc-status.vo';
import type { UserKycRepository } from '../../../../domain/repositories/user-kyc.repository.interface';

@Injectable()
export class UserKycPrismaRepository
  extends BasePrismaRepository<UserKycEntity, KycIdVO>
  implements UserKycRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaUserKyc): UserKycEntity {
    return UserKycEntity.reconstitute(
      KycIdVO.create(raw.id),
      {
        userId: UserIdVO.create(raw.userId),
        document: KycDocumentVO.create(raw.document),
        status: KycStatusVO.create(raw.status),
        submittedAt: raw.submittedAt,
        reviewedAt: raw.reviewedAt,
        rejectionReason: raw.rejectionReason,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: KycIdVO): Promise<UserKycEntity | null> {
    const raw = await this.prisma.userKyc.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly UserKycEntity[]> {
    const rows = await this.prisma.userKyc.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: UserKycEntity): Promise<UserKycEntity> {
    const data = {
      userId: entity.userId.value,
      document: entity.document.value,
      status: entity.status.value,
      submittedAt: entity.submittedAt,
      reviewedAt: entity.reviewedAt,
      rejectionReason: entity.rejectionReason,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.userKyc.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: KycIdVO): Promise<void> {
    await this.prisma.userKyc.delete({ where: { id: id.value } });
  }

  async findByUserId(userId: UserIdVO): Promise<UserKycEntity | null> {
    const raw = await this.prisma.userKyc.findUnique({
      where: { userId: userId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
