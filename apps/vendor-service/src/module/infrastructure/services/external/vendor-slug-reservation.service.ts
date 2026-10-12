/**
 * VendorSlugReservationService — temporary slug reservation during onboarding
 * @module vendor-service/infrastructure/services/external
 *
 * Prevents slug race conditions when multiple vendors register simultaneously.
 * Uses Redis-based locks with TTL.
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

const RESERVATION_PREFIX = 'vendor:slug:reserve:';
const RESERVATION_TTL = 600; // 10 minutes

export interface SlugReservation {
  readonly slug: string;
  readonly reservedBy: string;
  readonly reservedAt: string;
  readonly expiresAt: string;
}

@Injectable()
export class VendorSlugReservationService {
  private readonly logger = new Logger(VendorSlugReservationService.name);

  constructor(private readonly redis: RedisService) {}

  private key(slug: string): string {
    return `${RESERVATION_PREFIX}${slug}`;
  }

  async reserve(slug: string, reservedBy: string): Promise<SlugReservation | null> {
    const existing = await this.redis.get<SlugReservation>(this.key(slug));
    if (existing) {
      return null; // already reserved
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + RESERVATION_TTL * 1000);
    const reservation: SlugReservation = {
      slug,
      reservedBy,
      reservedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    };

    await this.redis.set(this.key(slug), reservation, RESERVATION_TTL);
    this.logger.log(`Reserved slug "${slug}" for ${reservedBy}`);
    return reservation;
  }

  async release(slug: string, releasedBy: string): Promise<boolean> {
    const existing = await this.redis.get<SlugReservation>(this.key(slug));
    if (!existing) return false;
    if (existing.reservedBy !== releasedBy) {
      this.logger.warn(`Slug "${slug}" reserved by ${existing.reservedBy}, not ${releasedBy}`);
      return false;
    }
    await this.redis.del(this.key(slug));
    this.logger.log(`Released slug "${slug}"`);
    return true;
  }

  async extend(slug: string, extendedBy: string): Promise<boolean> {
    const existing = await this.redis.get<SlugReservation>(this.key(slug));
    if (!existing || existing.reservedBy !== extendedBy) return false;
    const newExpiry = new Date(Date.now() + RESERVATION_TTL * 1000);
    const updated: SlugReservation = {
      ...existing,
      expiresAt: newExpiry.toISOString(),
    };
    await this.redis.set(this.key(slug), updated, RESERVATION_TTL);
    return true;
  }

  async getReservation(slug: string): Promise<SlugReservation | null> {
    return this.redis.get<SlugReservation>(this.key(slug));
  }

  async isReserved(slug: string): Promise<boolean> {
    return this.redis.exists(this.key(slug));
  }
}
