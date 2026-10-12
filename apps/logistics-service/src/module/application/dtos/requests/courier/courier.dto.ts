/**
 * Courier Request DTOs
 * @module logistics-service/application/dtos/requests/courier
 */
import type { CourierTypeValue, CourierStatusValue, CourierNameValue } from '@vubon/shared-types/logistics';

export interface RegisterCourierRequestDTO {
  readonly name: string;
  readonly code: CourierNameValue | string;
  readonly displayName: string;
  readonly type: CourierTypeValue;
  readonly logoUrl?: string;
  readonly website?: string;
  readonly contactPhone?: string;
  readonly contactEmail?: string;
  readonly trackingUrlTemplate?: string;
  readonly apiEnabled?: boolean;
  readonly coverageZones?: readonly string[];
  readonly supportsCOD: boolean;
  readonly supportsInsurance: boolean;
  readonly supportsInternational: boolean;
  readonly averageDeliveryDays: number;
  readonly priority?: number;
}

export interface UpdateCourierRequestDTO {
  readonly courierId: string;
  readonly displayName?: string;
  readonly priority?: number;
  readonly coverageZones?: readonly string[];
}

export interface SuspendCourierRequestDTO {
  readonly courierId: string;
  readonly reason: string;
}

export interface ActivateCourierRequestDTO {
  readonly courierId: string;
}

export interface DeactivateCourierRequestDTO {
  readonly courierId: string;
  readonly reason?: string;
}

export interface SetCourierDefaultRequestDTO {
  readonly courierId: string;
  readonly isDefault: boolean;
}

export interface CourierListFilterDTO {
  readonly status?: CourierStatusValue;
  readonly type?: CourierTypeValue;
  readonly supportsCOD?: boolean;
  readonly supportsInternational?: boolean;
  readonly zone?: string;
  readonly search?: string;
}
