/**
 * UserKycPrismaRepository
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { UserKyc as PrismaUserKyc } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import type { UserId } from '@vubon/shared-types/common';
import {
  UserKycEntity,
  type KycStatus,
  type KycDocumentType,
} from '../../../../domain/entities/user-kyc.entity';
import type { UserKycRepository } from '../../../../domain/repositories/user-kyc.repository.interface';

@Injectable()
export class UserKycPrismaRepository
  extends BasePrismaRepository<UserKycEntity, PrismaUserKyc, string>
  implements UserKycRepository {
  protected readonly model: PrismaDelegate<PrismaUserKyc>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.userKyc as unknown as PrismaDelegate<PrismaUserKyc>;
  }

  protected idOf(domain: UserKycEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  protected toDomain(raw: PrismaUserKyc): UserKycEntity {
    return UserKycEntity.create({
      id: raw.id,
      userId: raw.userId as UserId,
      status: raw.status as KycStatus,
      documentType: raw.documentType as KycDocumentType,
      documentNumber: raw.documentNumber,
      frontImageUrl: raw.documentUrl,
      backImageUrl: undefined,
      rejectionReason: raw.rejectionReason ?? undefined,
      submittedAt: raw.submittedAt ? raw.submittedAt.toISOString() : undefined,
      reviewedAt: raw.reviewedAt ? raw.reviewedAt.toISOString() : undefined,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: UserKycEntity): Record<string, unknown> {
    const front = (domain as unknown as { frontImageUrl?: string }).frontImageUrl ?? '';
    return {
      id: domain.id,
      userId: domain.userId,
      status: domain.status,
      documentType: domain.documentType,
      documentNumber: domain.documentNumber,
      documentUrl: front,
      updatedAt: new Date(),
    };
  }

  async findByUserId(userId: UserId): Promise<UserKycEntity | null> {
    const raw = await this.prisma.userKyc.findUnique({ where: { userId } });
    return raw ? this.toDomain(raw) : null;
  }

  async findPending(): Promise<readonly UserKycEntity[]> {
    const rows = await this.prisma.userKyc.findMany({
      where: { status: 'pending' },
      orderBy: { submittedAt: 'asc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByDocumentNumber(docNumber: string): Promise<UserKycEntity | null> {
    const raw = await this.prisma.userKyc.findFirst({
      where: { documentNumber: docNumber },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
