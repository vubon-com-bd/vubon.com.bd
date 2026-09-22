import { Injectable } from '@nestjs/common';
import { VendorSubscriptionEntity } from '../../../domain/entities/vendor-subscription.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { SubscriptionIdVO } from '../../../domain/value-objects/primitives/subscription-id.vo';
import type { VendorSubscriptionRepository } from '../../../domain/repositories/vendor-subscription.repository.interface';

@Injectable()
export class VendorSubscriptionService {
  constructor(private readonly repo: VendorSubscriptionRepository) {}

  async findById(id: SubscriptionIdVO): Promise<VendorSubscriptionEntity | null> {
    return this.repo.findById(id);
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorSubscriptionEntity[]> {
    return this.repo.findByVendorId(vendorId);
  }

  async save(subscription: VendorSubscriptionEntity): Promise<void> {
    await this.repo.save(subscription);
  }
}
