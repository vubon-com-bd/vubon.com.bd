import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { PackagingEntity } from '../entities/packaging.entity';

export interface PackagingRepository
  extends BaseRepository<PackagingEntity, string> {
  findByType(type: string): Promise<readonly PackagingEntity[]>;
  findAvailable(): Promise<readonly PackagingEntity[]>;
}
