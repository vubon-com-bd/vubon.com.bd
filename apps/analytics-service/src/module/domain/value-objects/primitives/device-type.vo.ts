import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID_DEVICE_TYPES = new Set<string>([
  'desktop', 'mobile', 'tablet', 'tv', 'wearable', 'bot', 'unknown',
]);

export class DeviceTypeVO extends BaseTypeVO<string> {
  static create(raw: string): DeviceTypeVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_DEVICE_TYPES.has(normalized)) {
      throw new Error(`Invalid device type: ${raw}`);
    }
    return new DeviceTypeVO(normalized);
  }

  private constructor(value: string) {
    super(value);
  }

  get isMobileLike(): boolean {
    return this.value === 'mobile' || this.value === 'tablet';
  }

  get isDesktopLike(): boolean {
    return this.value === 'desktop' || this.value === 'tv';
  }

  get isAutomated(): boolean {
    return this.value === 'bot';
  }
}
