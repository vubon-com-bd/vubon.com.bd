/**
 * OAuth Client Prisma Mapper
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { OAuthClientEntity } from '../../../../domain/entities/oauth-client.entity.js';
import { OAuthGrantTypeVO } from '../../../../domain/value-objects/primitives/oauth-grant-type.vo.js';

export interface PrismaOAuthClientRow {
  id: string;
  clientId: string;
  clientName: string;
  redirectUris: string[];
  scopes: string[];
  grantTypes: string[];
  isPublic: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class OAuthClientPrismaMapper {
  static toDomain(raw: PrismaOAuthClientRow): OAuthClientEntity {
    return OAuthClientEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      version: 1,
      props: {
        clientId: raw.clientId,
        clientName: raw.clientName,
        redirectUris: raw.redirectUris,
        scopes: raw.scopes,
        grantTypes: raw.grantTypes.map((g) => this.parseGrant(g)),
        isPublic: raw.isPublic,
        isActive: raw.isActive,
      },
    });
  }

  static toPersistence(entity: OAuthClientEntity): Record<string, unknown> {
    return {
      id: entity.id,
      clientId: entity.clientId,
      clientName: entity.clientName,
      redirectUris: [...entity.redirectUris],
      scopes: [...entity.scopes],
      grantTypes: entity.grantTypes.map((g) => g.value),
      isPublic: entity.isPublic,
      isActive: entity.isActive,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static parseGrant(v: string): OAuthGrantTypeVO {
    try { return OAuthGrantTypeVO.reconstitute(v); }
    catch { return OAuthGrantTypeVO.authorizationCode(); }
  }
}
