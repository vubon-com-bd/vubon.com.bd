/**
 * CourierResponseDTO — Full admin view
 * @module logistics-service/application/dtos/responses/courier
 */
import type { CourierNameValue } from '@domain/primitives/courier-name.vo';
import type { CourierStatusValue } from '@domain/primitives/courier-status.vo';
import type { CourierTypeValue } from '@domain/primitives/courier-type.vo';

export interface CourierResponseDTO {
  readonly id: string;
  readonly code: string;
  readonly name: CourierNameValue | string;
  readonly displayName: string;
  readonly type: CourierTypeValue;
  readonly status: CourierStatusValue;

  readonly logoUrl?: string;
  readonly website?: string;
  readonly contactPhone?: string;
  readonly contactEmail?: string;
  readonly trackingUrlTemplate?: string;

  readonly apiEnabled: boolean;
  readonly coverageZones?: readonly string[];
  readonly supportsCOD: boolean;
  readonly supportsInsurance: boolean;
  readonly supportsInternational: boolean;

  readonly averageDeliveryDays: number;
  readonly isDefault: boolean;
  readonly priority: number;

  readonly activatedAt?: string;
  readonly deactivatedAt?: string;
  readonly suspendedAt?: string;
  readonly terminatedAt?: string;
  readonly suspendReason?: string;
  readonly terminateReason?: string;
  readonly deactivateReason?: string;

  readonly createdAt: string;
  readonly updatedAt: string;
}
