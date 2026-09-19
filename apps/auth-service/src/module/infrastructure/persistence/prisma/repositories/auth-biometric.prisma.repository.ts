import { Injectable } from '@nestjs/common';
import { AuthBiometric as PrismaAuthBiometric } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { AuthBiometricEntity, type BiometricType } from '../../../../domain/entities/auth-biometric.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { BiometricIdVO } from '../../../../domain/value-objects/primitives/biometric-id.vo';
import type { AuthBiometricRepository } from '../../../../domain/repositories/auth-biometric.repository.interface';

@Injectable()
export class AuthBiometricPrismaRepository
  extends BasePrismaRepository<AuthBiometricEntity, UserIdVO>
  implements AuthBiometricRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAuthBiometric): AuthBiometricEntity {
    return AuthBiometricEntity.reconstitute(
      UserIdVO.create(raw.userId),
      {
        userId: UserIdVO.create(raw.userId),
        biometricId: BiometricIdVO.create(raw.biometricId),
        type: raw.type as BiometricType,
        isEnabled: raw.isEnabled,
        enrolledAt: raw.enrolledAt,
        lastUsedAt: raw.lastUsedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: UserIdVO): Promise<AuthBiometricEntity | null> {
    const raw = await this.prisma.authBiometric.findFirst({
      where: { userId: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AuthBiometricEntity[]> {
    const rows = await this.prisma.authBiometric.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AuthBiometricEntity): Promise<AuthBiometricEntity> {
    const data = {
      userId: entity.userId.value,
      biometricId: entity.biometricId.value,
      type: entity.type,
      isEnabled: entity.isEnabled,
      enrolledAt: entity.enrolledAt,
      lastUsedAt: entity.lastUsedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.authBiometric.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: UserIdVO): Promise<void> {
    await this.prisma.authBiometric.deleteMany({
      where: { userId: id.value },
    });
  }

  async findByUser(userId: UserIdVO): Promise<readonly AuthBiometricEntity[]> {
    const rows = await this.prisma.authBiometric.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
