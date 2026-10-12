/**
 * Recovery Code Prisma Mapper
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { AuthRecoveryCodeEntity } from '../../../../domain/entities/auth-recovery-code.entity.js';
import { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';
import { RecoveryCodeValueVO } from '../../../../domain/value-objects/primitives/recovery-code-value.vo.js';
import { RecoveryCodeStatusVO } from '../../../../domain/value-objects/primitives/recovery-code-status.vo.js';

export interface PrismaRecoveryCodeRow {
  id: string;
  userId: string;
  code: string;
  status: string;
  usedAt: Date | null;
  usedFromIp: string | null;
  generatedAt: Date;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class AuthRecoveryCodePrismaMapper {
  static toDomain(raw: PrismaRecoveryCodeRow): AuthRecoveryCodeEntity {
    return AuthRecoveryCodeEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      props: {
        authId: AuthIdVO.reconstitute(raw.userId),
        code: this.parseCode(raw.code),
        status: this.parseStatus(raw.status),
        usedAt: raw.usedAt ? new Date(raw.usedAt).toISOString() : undefined,
        usedFromIp: raw.usedFromIp ?? undefined,
        generatedAt: new Date(raw.generatedAt).toISOString(),
        expiresAt: raw.expiresAt
          ? new Date(raw.expiresAt).toISOString()
          : undefined,
      },
    });
  }

  static toPersistence(entity: AuthRecoveryCodeEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.authId.value,
      code: entity.code.value,
      status: entity.status.value,
      usedAt: entity.usedAt ? new Date(entity.usedAt) : null,
      usedFromIp: entity.usedFromIp ?? null,
      generatedAt: new Date(entity.generatedAt),
      expiresAt: entity.expiresAt ? new Date(entity.expiresAt) : null,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static parseCode(v: string): RecoveryCodeValueVO {
    try { return RecoveryCodeValueVO.reconstitute(v); }
    catch { return RecoveryCodeValueVO.reconstitute('UNKNOWN0'); }
  }
  private static parseStatus(v: string): RecoveryCodeStatusVO {
    try { return RecoveryCodeStatusVO.reconstitute(v); }
    catch { return RecoveryCodeStatusVO.active(); }
  }
}
