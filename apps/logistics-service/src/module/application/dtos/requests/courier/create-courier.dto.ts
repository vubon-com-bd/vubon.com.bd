/**
 * CreateCourierRequestDTO
 * @module logistics-service/application/dtos/requests/courier
 */
import type { CourierNameValue } from '@domain/primitives/courier-name.vo';
import type { CourierTypeValue } from '@domain/primitives/courier-type.vo';

export interface CreateCourierRequestDTO {
  readonly code: string;
  readonly name: CourierNameValue | string;
  readonly displayName: string;
  readonly type: CourierTypeValue;
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
  readonly isDefault?: boolean;
  readonly priority?: number;
}
