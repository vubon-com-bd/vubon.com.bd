import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { OrderEntity } from '../entities/order.entity';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';
import { OrderNumberVO } from '../value-objects/primitives/order-number.vo';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface OrderRepository extends BaseRepository<OrderEntity, OrderIdVO> {
  findByNumber(number: OrderNumberVO): Promise<OrderEntity | null>;
  existsByNumber(number: OrderNumberVO): Promise<boolean>;
  findByCustomer(customerId: CustomerIdVO): Promise<readonly OrderEntity[]>;
  findByVendor(vendorId: VendorIdVO): Promise<readonly OrderEntity[]>;
  findByStatus(status: string): Promise<readonly OrderEntity[]>;
}
