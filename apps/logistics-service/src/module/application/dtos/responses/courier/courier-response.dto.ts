/**
 * Courier Response DTOs
 * @module logistics-service/application/dtos/responses/courier
 */
import type { CourierTypeValue, CourierStatusValue } from '@vubon/shared-types/logistics';

export interface CourierResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly displayName: string;
  readonly type: CourierTypeValue;
  readonly status: CourierStatusValue;
  readonly logoUrl?: string;
  readonly website?: string;
  readonly contactPhone?: string;
  readonly contactEmail?: string;
  readonly trackingUrlTemplate?: string;
  readonly apiEnabled: boolean;
  readonly coverageZones: readonly string[];
  readonly supportsCOD: boolean;
  readonly supportsInsurance: boolean;
  readonly supportsInternational: boolean;
  readonly averageDeliveryDays: number;
  readonly isDefault: boolean;
  readonly priority: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CourierPublicResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly displayName: string;
  readonly type: CourierTypeValue;
  readonly status: CourierStatusValue;
  readonly logoUrl?: string;
  readonly supportsCOD: boolean;
}

export interface CourierListResponseDTO {
  readonly items: readonly CourierResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
