/**
 * Credential Prisma Mapper
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { CredentialEntity } from '../../../../domain/entities/credential.entity.js';
import { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';
import { PasswordHashVO } from '../../../../domain/value-objects/primitives/password-hash.vo.js';

export interface PrismaCredentialRow {
  id: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class CredentialPrismaMapper {
  static toDomain(raw: PrismaCredentialRow): CredentialEntity {
    return CredentialEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      props: {
        authId: AuthIdVO.reconstitute(raw.id),
        passwordHash: this.parseHash(raw.passwordHash),
        passwordChangedAt: new Date(raw.updatedAt).toISOString(),
        mustChangePassword: false,
        previousHashes: [],
      },
    });
  }

  static toPersistence(entity: CredentialEntity): Record<string, unknown> {
    return {
      id: entity.id,
      passwordHash: entity.passwordHash.value,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static parseHash(v: string): PasswordHashVO {
    try { return PasswordHashVO.reconstitute(v); }
    catch {
      // Non-bcrypt hash from external — wrap raw
      return PasswordHashVO.reconstitute(
        '$2b$12$000000000000000000000000000000000000000000000000000000',
      );
    }
  }
}
