import type { VendorPerformanceEntity } from '../../../domain/entities/vendor-performance.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';

export interface VendorPerformanceServiceInterface {
  findByVendorId(vendorId: VendorIdVO): Promise<VendorPerformanceEntity | null>;
  save(performance: VendorPerformanceEntity): Promise<void>;
}
