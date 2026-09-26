/**
 * AuthBiometricPrismaRepository
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { AuthBiometric as PrismaAuthBiometric } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import type { UserId } from '@vubon/shared-types/common';
import {
  AuthBiometricEntity,
  type BiometricKind,
} from '../../../../domain/entities/auth-biometric.entity';
import { BiometricIdVO } from '../../../../domain/value-objects/primitives/biometric-id.vo';
import type { AuthBiometricRepository } from '../../../../domain/repositories/auth-biometric.repository.interface';

@Injectable()
export class AuthBiometricPrismaRepository
  extends BasePrismaRepository<AuthBiometricEntity, PrismaAuthBiometric, string>
  implements AuthBiometricRepository {
  protected readonly model: PrismaDelegate<PrismaAuthBiometric>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.authBiometric as unknown as PrismaDelegate<PrismaAuthBiometric>;
  }

  protected idOf(domain: AuthBiometricEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  protected toDomain(raw: PrismaAuthBiometric): AuthBiometricEntity {
    return AuthBiometricEntity.create({
      id: raw.id,
      userId: raw.userId as UserId,
      biometricId: BiometricIdVO.of(raw.biometricId),
      kind: raw.type as BiometricKind,
      deviceId: undefined,
      enrolledAt: raw.enrolledAt ? raw.enrolledAt.getTime() : raw.createdAt.getTime(),
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: AuthBiometricEntity): Record<string, unknown> {
    return {
      id: domain.id,
      userId: domain.userId,
      biometricId: domain.biometricId.value,
      type: domain.kind,
      isEnabled: true,
      enrolledAt: new Date(domain.enrolledAt),
      lastUsedAt: null,
      updatedAt: new Date(),
    };
  }

  async findByUser(userId: UserId): Promise<readonly AuthBiometricEntity[]> {
    const rows = await this.prisma.authBiometric.findMany({ where: { userId } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByBiometricId(
    biometricId: BiometricIdVO,
  ): Promise<AuthBiometricEntity | null> {
    const raw = await this.prisma.authBiometric.findFirst({
      where: { biometricId: biometricId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByUserAndKind(
    userId: UserId,
    kind: BiometricKind,
  ): Promise<readonly AuthBiometricEntity[]> {
    const rows = await this.prisma.authBiometric.findMany({
      where: { userId, type: kind },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
