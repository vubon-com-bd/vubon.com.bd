/**
 * ComplaintRepository — Repository interface
 * @module support-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ComplaintEntity } from '../entities/complaint.entity';
import { ComplaintIdVO } from '../value-objects/primitives/complaint-id.vo';
import { ComplaintStatusVO } from '../value-objects/primitives/complaint-status.vo';
import { ComplaintSeverityVO } from '../value-objects/primitives/complaint-severity.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';

export interface ComplaintRepository
  extends BaseRepository<ComplaintEntity, ComplaintIdVO> {
  findByUser(userId: UserIdVO): Promise<readonly ComplaintEntity[]>;
  findByVendor(vendorId: VendorIdVO): Promise<readonly ComplaintEntity[]>;
  findByOrder(orderId: OrderIdVO): Promise<readonly ComplaintEntity[]>;
  findBySeverity(severity: ComplaintSeverityVO): Promise<readonly ComplaintEntity[]>;
  findByStatus(status: ComplaintStatusVO): Promise<readonly ComplaintEntity[]>;
  findCriticalUnresolved(): Promise<readonly ComplaintEntity[]>;
  countUnresolvedByVendor(vendorId: VendorIdVO): Promise<number>;
}
