import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorPerformanceEntity } from '../entities/vendor-performance.entity';
import { PerformanceIdVO } from '../value-objects/primitives/performance-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorPerformanceRepository
  extends BaseRepository<VendorPerformanceEntity, PerformanceIdVO> {
  findByVendorId(vendorId: VendorIdVO): Promise<VendorPerformanceEntity | null>;
}
