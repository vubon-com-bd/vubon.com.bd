import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { DriverEntity } from '../entities/driver.entity';
import { DriverIdVO } from '../value-objects/primitives/driver-id.vo';
import { DriverLicenseVO } from '../value-objects/primitives/driver-license.vo';

export interface DriverRepository
  extends BaseRepository<DriverEntity, DriverIdVO> {
  findByLicense(license: DriverLicenseVO): Promise<DriverEntity | null>;
  findAvailable(): Promise<readonly DriverEntity[]>;
  findByStatus(status: string): Promise<readonly DriverEntity[]>;
}
