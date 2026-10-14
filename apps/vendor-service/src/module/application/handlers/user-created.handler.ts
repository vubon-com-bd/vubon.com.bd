/**
 * UserCreatedHandler — consume identity-service's user.created event
 * @module vendor-service/application/handlers
 *
 * When a user registers in identity-service:
 *   1. Auto-create a skeleton vendor profile
 *   2. Status: pending (user completes profile later)
 *   3. Name/slug derived from userId
 */
import { Injectable, Logger, Inject } from '@nestjs/common';
import type { DomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../services/interfaces/vendor.service.interface.js';

// ─── Event Payload Shape (from identity-service) ───
interface UserCreatedPayload {
  readonly userId: string;
  readonly email: string;
  readonly type: string;
  readonly roles: readonly string[];
  readonly createdAt: string;
}

interface UserCreatedEvent extends DomainEvent<'user.created', UserCreatedPayload> {}

@Injectable()
export class UserCreatedHandler {
  private readonly logger = new Logger(UserCreatedHandler.name);

  constructor(
    @Inject(VENDOR_SERVICE)
    private readonly vendorService: IVendorService,
  ) {}

  /**
   * Handle user.created event.
   * Creates a skeleton vendor in 'pending' status.
   */
  async handle(event: DomainEvent): Promise<void> {
    const payload = event.payload as UserCreatedPayload;

    this.logger.log(
      `📥 Received user.created → userId=${payload.userId} email=${payload.email}`,
    );

    // ─── Derive skeleton vendor fields ───
    const shortId = payload.userId.slice(0, 8);
    const name = `Vendor-${shortId}`;
    const slug = `vendor-${shortId}`;

    try {
      const result = await this.vendorService.register(
        {
          name,
          slug,
          email: payload.email,
          type: 'individual',
          businessType: 'retailer',
          displayName: name,
        } as never,
        payload.userId,
      );

      this.logger.log(
        `✅ Skeleton vendor created: id=${result.vendorId} slug=${result.slug}`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(
        `⚠️ Skeleton vendor creation skipped for ${payload.userId}: ${msg}`,
      );
    }
  }
}
