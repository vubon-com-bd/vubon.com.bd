/**
 * DeviceTypeVO — Device classification
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

export type DeviceTypeValue =
  | 'mobile'
  | 'tablet'
  | 'desktop'
  | 'laptop'
  | 'smart_tv'
  | 'console'
  | 'unknown';

const ALLOWED: ReadonlySet<string> = new Set<string>([
  'mobile', 'tablet', 'desktop', 'laptop', 'smart_tv', 'console', 'unknown',
]);

export class DeviceTypeVO extends BaseTypeVO<DeviceTypeValue> {
  private constructor(value: DeviceTypeValue) {
    super(value);
  }

  static of(raw: string): DeviceTypeVO {
    const lower = raw.toLowerCase().replace(/\s+/g, '_');
    if (!ALLOWED.has(lower)) {
      return new DeviceTypeVO('unknown');
    }
    return new DeviceTypeVO(lower as DeviceTypeValue);
  }

  isMobile(): boolean {
    return this.value === 'mobile' || this.value === 'tablet';
  }
}
