import type { VendorSubscriptionEntity } from '../../../domain/entities/vendor-subscription.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { SubscriptionIdVO } from '../../../domain/value-objects/primitives/subscription-id.vo';

export interface VendorSubscriptionServiceInterface {
  findById(id: SubscriptionIdVO): Promise<VendorSubscriptionEntity | null>;
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorSubscriptionEntity[]>;
  save(subscription: VendorSubscriptionEntity): Promise<void>;
}
