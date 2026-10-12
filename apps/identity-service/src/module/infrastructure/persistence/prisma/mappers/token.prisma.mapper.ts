/**
 * Token Prisma Mapper — Prisma `AuthToken` row ↔ `TokenEntity`
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { TokenEntity } from '../../../../domain/entities/token.entity.js';
import { TokenIdVO } from '../../../../domain/value-objects/primitives/token-id.vo.js';
import { SessionIdVO } from '../../../../domain/value-objects/primitives/session-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { TokenTypeVO } from '../../../../domain/value-objects/primitives/token-type.vo.js';
import { TokenValueVO } from '../../../../domain/value-objects/primitives/token-value.vo.js';
import { TokenExpiryVO } from '../../../../domain/value-objects/primitives/token-expiry.vo.js';

export interface PrismaTokenRow {
  id: string;
  userId: string;
  tokenValue: string;
  tokenType: string;
  expiry: Date;
  issuedAt: Date;
  revokedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class TokenPrismaMapper {
  static toDomain(raw: PrismaTokenRow): TokenEntity {
    const expiresAtSec = Math.floor(new Date(raw.expiry).getTime() / 1000);

    return TokenEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      version: 1,
      props: {
        userId: UserIdVO.reconstitute(raw.userId),
        sessionId: SessionIdVO.reconstitute(raw.id),
        type: this.parseType(raw.tokenType),
        value: TokenValueVO.reconstitute(raw.tokenValue),
        expiry: TokenExpiryVO.fromEpochSeconds(expiresAtSec),
        jti: raw.id,
        revokedAt: raw.revokedAt
          ? new Date(raw.revokedAt).toISOString()
          : undefined,
        revokedReason: raw.revokedAt ? 'revoked' : undefined,
      },
    });
  }

  static toPersistence(entity: TokenEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId.value,
      tokenValue: entity.value.value,
      tokenType: entity.type.value,
      expiry: new Date(entity.expiry.expiresAt * 1000),
      revokedAt: entity.revokedAt ? new Date(entity.revokedAt) : null,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static parseType(value: string): TokenTypeVO {
    try {
      return TokenTypeVO.reconstitute(value);
    } catch {
      return TokenTypeVO.access();
    }
  }
}
