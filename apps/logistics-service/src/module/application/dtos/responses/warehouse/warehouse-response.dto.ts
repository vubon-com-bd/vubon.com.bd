import type { WarehouseStatusValue } from '@domain/primitives/warehouse-status.vo';

export interface WarehouseResponseDTO {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly type: string;
  readonly status: WarehouseStatusValue;
  readonly address: string;
  readonly contactName?: string;
  readonly contactPhone?: string;
  readonly contactEmail?: string;
  readonly managerId?: string;
  readonly capacityM3?: number;
  readonly capacityKg?: number;
  readonly usedCapacityM3?: number;
  readonly usedCapacityKg?: number;
  readonly maxSkus?: number;
  readonly zone: string;
  readonly operatingHoursStart?: number;
  readonly operatingHoursEnd?: number;
  readonly timezone: string;
  readonly isDefault: boolean;
  readonly activatedAt?: string;
  readonly deactivatedAt?: string;
  readonly maintenanceStartedAt?: string;
  readonly maintenanceEndedAt?: string;
  readonly fullMarkedAt?: string;
  readonly closedAt?: string;
  readonly archivedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
