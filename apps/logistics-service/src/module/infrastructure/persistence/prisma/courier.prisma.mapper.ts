/**
 * CourierPrismaMapper — row ↔ domain entity
 * @module logistics-service/infrastructure/persistence/prisma
 */
import { CourierEntity } from '../../../domain/entities/courier.entity.js';
import { CourierIdVO } from '../../../domain/value-objects/primitives/courier-id.vo.js';
import { CourierStatusVO } from '../../../domain/value-objects/primitives/courier-status.vo.js';
import { CourierTypeVO } from '../../../domain/value-objects/primitives/courier-type.vo.js';
import { CourierNameVO } from '../../../domain/value-objects/primitives/courier-name.vo.js';
import { CourierConfigVO } from '../../../domain/value-objects/composites/courier-config.vo.js';
import type { Phone, Email, Url } from '@vubon/shared-types/common';

export interface PrismaCourierRow {
  id: string;
  code: string;
  name: string;
  displayName: string;
  type: string;
  status: string;
  logoUrl: string | null;
  website: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  trackingUrlTemplate: string | null;
  apiEnabled: boolean;
  apiBaseUrl: string | null;
  apiKeyName: string | null;
  webhookSecretName: string | null;
  apiTimeoutMs: number;
  retryAttempts: number;
  coverageZones: string[];
  supportsCOD: boolean;
  supportsInsurance: boolean;
  supportsInternational: boolean;
  averageDeliveryDays: number;
  isDefault: boolean;
  priority: number;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class CourierPrismaMapper {
  static toDomain(raw: PrismaCourierRow): CourierEntity {
    const config = raw.apiBaseUrl && raw.apiKeyName
      ? CourierConfigVO.reconstitute({
          baseUrl: raw.apiBaseUrl,
          apiKeyName: raw.apiKeyName,
          webhookSecretName: raw.webhookSecretName ?? undefined,
          timeoutMs: raw.apiTimeoutMs,
          retryAttempts: raw.retryAttempts,
          isEnabled: raw.apiEnabled,
        })
      : undefined;

    return CourierEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        name: raw.name,
        code: CourierNameVO.reconstitute(raw.code),
        displayName: raw.displayName,
        type: CourierTypeVO.reconstitute(raw.type),
        status: CourierStatusVO.reconstitute(raw.status),
        logoUrl: raw.logoUrl ? (raw.logoUrl as Url) : undefined,
        website: raw.website ? (raw.website as Url) : undefined,
        contactPhone: raw.contactPhone ? (raw.contactPhone as Phone) : undefined,
        contactEmail: raw.contactEmail ? (raw.contactEmail as Email) : undefined,
        trackingUrlTemplate: raw.trackingUrlTemplate ?? undefined,
        apiEnabled: raw.apiEnabled,
        config,
        coverageZones: raw.coverageZones,
        supportsCOD: raw.supportsCOD,
        supportsInsurance: raw.supportsInsurance,
        supportsInternational: raw.supportsInternational,
        averageDeliveryDays: raw.averageDeliveryDays,
        isDefault: raw.isDefault,
        priority: raw.priority,
      },
    });
  }

  static toPersistence(entity: CourierEntity): Record<string, unknown> {
    return {
      id: entity.id,
      code: entity.code.value,
      name: entity.name,
      displayName: entity.displayName,
      type: entity.type.value,
      status: entity.status.value,
      logoUrl: entity.logoUrl ?? null,
      website: entity.website ?? null,
      contactPhone: entity.contactPhone ?? null,
      contactEmail: entity.contactEmail ?? null,
      trackingUrlTemplate: entity.trackingUrlTemplate ?? null,
      apiEnabled: entity.apiEnabled,
      apiBaseUrl: entity.config?.baseUrl ?? null,
      apiKeyName: entity.config?.apiKeyName ?? null,
      webhookSecretName: entity.config?.webhookSecretName ?? null,
      apiTimeoutMs: entity.config?.timeoutMs ?? 30000,
      retryAttempts: entity.config?.retryAttempts ?? 3,
      coverageZones: [...entity.coverageZones],
      supportsCOD: entity.supportsCOD,
      supportsInsurance: entity.supportsInsurance,
      supportsInternational: entity.supportsInternational,
      averageDeliveryDays: entity.averageDeliveryDays,
      isDefault: entity.isDefault,
      priority: entity.priority,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
