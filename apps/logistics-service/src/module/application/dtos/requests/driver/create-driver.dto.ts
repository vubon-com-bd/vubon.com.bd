import type { DriverTypeValue } from '@domain/primitives/driver-type.vo';
import type { DriverLicenseTypeValue } from '@domain/primitives/driver-license.vo';

export interface CreateDriverRequestDTO {
  readonly userId?: string;
  readonly name: string;
  readonly phone: string;
  readonly email?: string;
  readonly type: DriverTypeValue;
  readonly licenseNumber: string;
  readonly licenseType: DriverLicenseTypeValue;
  readonly licenseExpiresAt: string;
  readonly dateOfBirth?: string;
  readonly address?: string;
  readonly warehouseId?: string;
  readonly cashLimit?: number;
}
