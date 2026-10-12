/**
 * Device Type Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Analytics device classification (desktop, mobile, tablet, tv, wearable, bot, unknown)।
 * Business Rule:
 * - DEVICE_TYPE constants থেকে হতে হবে
 * - Bot filtered out from user analytics
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { DEVICE_TYPE } from '@vubon/shared-constants/common';

const VALID_TYPES: readonly string[] = Object.values(DEVICE_TYPE);

export class DeviceTypeVO extends BaseTypeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeviceTypeVO {
    if (typeof raw !== 'string') {
      throw new Error('DeviceType must be a string');
    }

    const normalized = raw.trim().toLowerCase();

    if (!VALID_TYPES.includes(normalized)) {
      throw new Error(
        `Invalid DeviceType: "${normalized}". Valid: ${VALID_TYPES.join(', ')}`
      );
    }

    return new DeviceTypeVO(normalized);
  }

  static unknown(): DeviceTypeVO {
    return new DeviceTypeVO(DEVICE_TYPE.UNKNOWN);
  }

  isDesktop(): boolean {
    return this.value === DEVICE_TYPE.DESKTOP;
  }

  isMobile(): boolean {
    return this.value === DEVICE_TYPE.MOBILE;
  }

  isTablet(): boolean {
    return this.value === DEVICE_TYPE.TABLET;
  }

  isTv(): boolean {
    return this.value === DEVICE_TYPE.TV;
  }

  isWearable(): boolean {
    return this.value === DEVICE_TYPE.WEARABLE;
  }

  isBot(): boolean {
    return this.value === DEVICE_TYPE.BOT;
  }

  isUnknown(): boolean {
    return this.value === DEVICE_TYPE.UNKNOWN;
  }

  /** Mobile/tablet কিনা */
  isHandheld(): boolean {
    return this.isMobile() || this.isTablet();
  }

  /** Large screen কিনা */
  isLargeScreen(): boolean {
    return this.isDesktop() || this.isTv();
  }

  /** Real user device কিনা (bot + unknown filtered) */
  isRealUser(): boolean {
    return !this.isBot() && !this.isUnknown();
  }

  /** UI optimization hint */
  uiMode(): 'mobile-first' | 'desktop' | 'tv' | 'wearable' | 'bot' | 'unknown' {
    if (this.isHandheld()) return 'mobile-first';
    if (this.isDesktop()) return 'desktop';
    if (this.isTv()) return 'tv';
    if (this.isWearable()) return 'wearable';
    if (this.isBot()) return 'bot';
    return 'unknown';
  }
}
