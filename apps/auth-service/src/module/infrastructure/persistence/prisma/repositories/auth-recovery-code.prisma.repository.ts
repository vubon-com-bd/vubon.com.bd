import { Injectable } from '@nestjs/common';
import { AuthRecoveryCode as PrismaAuthRecoveryCode } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { AuthRecoveryCodeEntity } from '../../../../domain/entities/auth-recovery-code.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { RecoveryCodeVO } from '../../../../domain/value-objects/primitives/recovery-code.vo';
import { RecoveryCodeStatusVO } from '../../../../domain/value-objects/primitives/recovery-code-status.vo';
import type { AuthRecoveryCodeRepository } from '../../../../domain/repositories/auth-recovery-code.repository.interface';

@Injectable()
export class AuthRecoveryCodePrismaRepository
  extends BasePrismaRepository<AuthRecoveryCodeEntity, string>
  implements AuthRecoveryCodeRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAuthRecoveryCode): AuthRecoveryCodeEntity {
    return AuthRecoveryCodeEntity.reconstitute(
      raw.id,
      {
        userId: UserIdVO.create(raw.userId),
        code: RecoveryCodeVO.create(raw.code),
        status: RecoveryCodeStatusVO.create(raw.status),
        usedAt: raw.usedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: string): Promise<AuthRecoveryCodeEntity | null> {
    const raw = await this.prisma.authRecoveryCode.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AuthRecoveryCodeEntity[]> {
    const rows = await this.prisma.authRecoveryCode.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AuthRecoveryCodeEntity): Promise<AuthRecoveryCodeEntity> {
    const data = {
      userId: entity.userId.value,
      code: entity.code.value,
      status: entity.status.value,
      usedAt: entity.usedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.authRecoveryCode.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.authRecoveryCode.delete({ where: { id } });
  }

  async findByUserId(userId: UserIdVO): Promise<readonly AuthRecoveryCodeEntity[]> {
    const rows = await this.prisma.authRecoveryCode.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async markUsed(id: string): Promise<void> {
    await this.prisma.authRecoveryCode.update({
      where: { id },
      data: { status: 'used', usedAt: new Date(), updatedAt: new Date() },
    });
  }

  async deleteAllForUser(userId: UserIdVO): Promise<void> {
    await this.prisma.authRecoveryCode.deleteMany({
      where: { userId: userId.value },
    });
  }
}
