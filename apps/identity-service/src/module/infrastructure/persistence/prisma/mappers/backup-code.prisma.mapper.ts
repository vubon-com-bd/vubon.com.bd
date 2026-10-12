/**
 * Backup Code Prisma Mapper
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { BackupCodeEntity } from '../../../../domain/entities/backup-code.entity.js';
import { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';
import { BackupCodeVO } from '../../../../domain/value-objects/primitives/backup-code.vo.js';

export interface PrismaBackupCodeRow {
  id: string;
  userId: string;
  code: string;
  used: boolean;
  usedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class BackupCodePrismaMapper {
  static toDomain(raw: PrismaBackupCodeRow): BackupCodeEntity {
    return BackupCodeEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      props: {
        authId: AuthIdVO.reconstitute(raw.userId),
        code: this.parseCode(raw.code),
        used: raw.used,
        usedAt: raw.usedAt ? new Date(raw.usedAt).toISOString() : undefined,
      },
    });
  }

  static toPersistence(entity: BackupCodeEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.authId.value,
      code: entity.code.value,
      used: entity.used,
      usedAt: entity.usedAt ? new Date(entity.usedAt) : null,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static parseCode(v: string): BackupCodeVO {
    try { return BackupCodeVO.reconstitute(v); }
    catch { return BackupCodeVO.reconstitute('UNKNOWN0'); }
  }
}
