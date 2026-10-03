/**
 * UserKycPrismaRepository
 */
import { Injectable } from '@nestjs/common';
import type { UserKyc as PrismaUserKyc } from '@prisma/client';
import { PrismaService } from '../prisma.service.js';
import type { UserKycRepository } from '@domain/repositories/user-kyc.repository.interface';
import { UserKycEntity } from '@domain/entities/user-kyc.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { KycIdVO } from '@domain/value-objects/primitives/kyc-id.vo';
import { KycDocumentVO } from '@domain/value-objects/primitives/kyc-document.vo';
import { KycStatusVO } from '@domain/value-objects/primitives/kyc-status.vo';
import { ActivityTimestampVO } from '@domain/value-objects/primitives/activity-timestamp.vo';

@Injectable()
export class UserKycPrismaRepository implements UserKycRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(raw: PrismaUserKyc): UserKycEntity {
    return UserKycEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: null,
      props: {
        kycId: KycIdVO.create(raw.id),
        userId: UserIdVO.create(raw.userId),
        document: KycDocumentVO.create(raw.document ?? raw.documentType ?? 'nid'),
        status: KycStatusVO.create(raw.status),
        submittedAt: raw.submittedAt
          ? ActivityTimestampVO.fromEpochMs(raw.submittedAt.getTime())
          : null,
        verifiedAt: raw.reviewedAt
          ? ActivityTimestampVO.fromEpochMs(raw.reviewedAt.getTime())
          : null,
        rejectionReason: raw.rejectionReason ?? null,
      },
    });
  }

  async findById(id: string): Promise<UserKycEntity | null> {
    const raw = await this.prisma.userKyc.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly UserKycEntity[]> {
    const raws = await this.prisma.userKyc.findMany();
    return raws.map((r) => this.toDomain(r));
  }

  async save(entity: UserKycEntity): Promise<UserKycEntity> {
    const raw = await this.prisma.userKyc.upsert({
      where: { id: entity.id },
      create: {
        id: entity.id,
        userId: entity.userId.value,
        document: entity.document.value,
        status: entity.status.value,
        submittedAt: entity.submittedAt?.toDate() ?? null,
        reviewedAt: entity.verifiedAt?.toDate() ?? null,
        rejectionReason: entity.rejectionReason,
      },
      update: {
        document: entity.document.value,
        status: entity.status.value,
        submittedAt: entity.submittedAt?.toDate() ?? null,
        reviewedAt: entity.verifiedAt?.toDate() ?? null,
        rejectionReason: entity.rejectionReason,
        updatedAt: new Date(),
      },
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.userKyc.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.userKyc.count({ where: { id } });
    return count > 0;
  }

  async findByUserId(userId: UserIdVO): Promise<UserKycEntity | null> {
    const raw = await this.prisma.userKyc.findUnique({
      where: { userId: userId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAllByUserId(userId: UserIdVO): Promise<readonly UserKycEntity[]> {
    const raws = await this.prisma.userKyc.findMany({
      where: { userId: userId.value },
    });
    return raws.map((r) => this.toDomain(r));
  }

  async findByStatus(status: KycStatusVO): Promise<readonly UserKycEntity[]> {
    const raws = await this.prisma.userKyc.findMany({ where: { status: status.value } });
    return raws.map((r) => this.toDomain(r));
  }

  async existsById(id: KycIdVO): Promise<boolean> {
    const count = await this.prisma.userKyc.count({ where: { id: id.value } });
    return count > 0;
  }

  async latestForUser(userId: UserIdVO): Promise<UserKycEntity | null> {
    const raw = await this.prisma.userKyc.findFirst({
      where: { userId: userId.value },
      orderBy: { createdAt: 'desc' },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
