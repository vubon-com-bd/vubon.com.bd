/**
 * PushPlatform Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { PUSH_PLATFORM } from '@vubon/shared-constants/platform/notification';
import { InvalidPushPlatformError } from '../../errors/delivery.errors.js';

type PushPlatformValue = (typeof PUSH_PLATFORM)[keyof typeof PUSH_PLATFORM];
const ALLOWED = Object.values(PUSH_PLATFORM) as readonly string[];

export class PushPlatformVO extends BaseTypeVO<PushPlatformValue> {
  private constructor(value: PushPlatformValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): PushPlatformVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidPushPlatformError(raw, ALLOWED);
    }
    return new PushPlatformVO(raw as PushPlatformValue);
  }

  static reconstitute(raw: string): PushPlatformVO {
    return new PushPlatformVO(raw as PushPlatformValue);
  }

  static android(): PushPlatformVO { return new PushPlatformVO(PUSH_PLATFORM.ANDROID); }
  static ios(): PushPlatformVO { return new PushPlatformVO(PUSH_PLATFORM.IOS); }
  static web(): PushPlatformVO { return new PushPlatformVO(PUSH_PLATFORM.WEB); }
  static windows(): PushPlatformVO { return new PushPlatformVO(PUSH_PLATFORM.WINDOWS); }
  static macos(): PushPlatformVO { return new PushPlatformVO(PUSH_PLATFORM.MACOS); }

  isAndroid(): boolean { return this.value === PUSH_PLATFORM.ANDROID; }
  isIos(): boolean { return this.value === PUSH_PLATFORM.IOS; }
  isWeb(): boolean { return this.value === PUSH_PLATFORM.WEB; }

  /** Whether APNs vs FCM should be used. */
  usesApns(): boolean {
    return this.value === PUSH_PLATFORM.IOS || this.value === PUSH_PLATFORM.MACOS;
  }

  usesFcm(): boolean {
    return !this.usesApns();
  }
}
