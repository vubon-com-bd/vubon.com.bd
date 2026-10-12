/**
 * SSO Config Prisma Mapper
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { SsoConfigEntity } from '../../../../domain/entities/sso-config.entity.js';
import { SsoProviderVO } from '../../../../domain/value-objects/primitives/sso-provider.vo.js';

export interface PrismaSsoConfigRow {
  id: string;
  name: string;
  provider: string;
  entryPoint: string;
  issuer: string;
  certificate: string | null;
  metadataUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class SsoConfigPrismaMapper {
  static toDomain(raw: PrismaSsoConfigRow): SsoConfigEntity {
    return SsoConfigEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      version: 1,
      props: {
        name: raw.name,
        provider: this.parseProvider(raw.provider),
        entryPoint: raw.entryPoint,
        issuer: raw.issuer,
        certificate: raw.certificate ?? undefined,
        metadataUrl: raw.metadataUrl ?? undefined,
        isActive: raw.isActive,
      },
    });
  }

  static toPersistence(entity: SsoConfigEntity): Record<string, unknown> {
    return {
      id: entity.id,
      name: entity.name,
      provider: entity.provider.value,
      entryPoint: entity.entryPoint,
      issuer: entity.issuer,
      certificate: entity.certificate ?? null,
      metadataUrl: entity.metadataUrl ?? null,
      isActive: entity.isActive,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static parseProvider(v: string): SsoProviderVO {
    try { return SsoProviderVO.reconstitute(v); }
    catch { return SsoProviderVO.saml(); }
  }
}
