/**
 * UserCreatedHandler — creates pending vendor stub when user registers
 * @module vendor-service/application/events/external
 *
 * Identity service emits 'user.created' on successful registration.
 * This handler creates a PENDING vendor stub for every new user,
 * so they can be upgraded to full vendor later.
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  VENDOR_TYPE,
  VENDOR_BUSINESS_TYPE,
  VENDOR_TIER,
} from '@vubon/shared-constants/business';

import {
  VENDOR_REPOSITORY,
  type VendorRepository,
} from '../../../domain/repositories/vendor.repository.interface.js';
import { VendorEntity } from '../../../domain/entities/vendor.entity.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorNameVO } from '../../../domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorTypeVO } from '../../../domain/value-objects/primitives/vendor-type.vo.js';
import { BusinessTypeVO } from '../../../domain/value-objects/primitives/business-type.vo.js';
import { VendorTierVO } from '../../../domain/value-objects/primitives/vendor-tier.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';

export const USER_CREATED_EVENT = 'user.created';

interface UserCreatedPayload {
  readonly userId: string;
  readonly email: string;
  readonly type: string;
  readonly roles: readonly string[];
  readonly createdAt: string;
}

interface UserCreatedEvent {
  readonly id: string;
  readonly type: 'user.created';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: UserCreatedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class UserCreatedHandler implements OnModuleInit {
  private readonly logger = new Logger(UserCreatedHandler.name);

  constructor(
    @Inject(VENDOR_REPOSITORY)
    private readonly vendorRepo: VendorRepository,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_CREATED_EVENT, async (event) => {
      await this.handle(event as unknown as UserCreatedEvent);
    });
    this.logger.log(`✅ Registered handler for "${USER_CREATED_EVENT}"`);
  }

  private async handle(event: UserCreatedEvent): Promise<void> {
    const { userId, email } = event.payload;

    this.logger.log(
      `Received user.created — userId=${userId} (${email})`,
    );

    try {
      if (await this.vendorRepo.existsByUserId(userId)) {
        this.logger.debug(
          `Vendor stub already exists for user ${userId} — skipping`,
        );
        return;
      }

      const now = new Date().toISOString();
      const vendorId = VendorIdVO.create(crypto.randomUUID());
      const slugBase = `pending-${userId.slice(0, 8)}`;

      const vendor = VendorEntity.create({
        id: vendorId,
        props: {
          id: vendorId,
          userId: UserIdVO.create(userId),
          name: VendorNameVO.create(`Vendor ${userId.slice(0, 8)}`),
          slug: VendorSlugVO.fromName(slugBase),
          displayName: `Pending Vendor (${email})`,
          email,
          type: VendorTypeVO.create(VENDOR_TYPE.INDIVIDUAL),
          businessType: BusinessTypeVO.create(VENDOR_BUSINESS_TYPE.RETAILER),
          tier: VendorTierVO.create(VENDOR_TIER.BRONZE),
          joinedAt: now,
        },
        now,
      });

      await this.vendorRepo.save(vendor);

      this.logger.log(
        `✅ Pending vendor ${vendorId.value} created for user ${userId}`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(
        `UserCreatedHandler failed for user ${userId}: ${msg}`,
      );
    }
  }
}
