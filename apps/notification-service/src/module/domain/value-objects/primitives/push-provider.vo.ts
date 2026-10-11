/**
 * PushProvider Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { PUSH_PROVIDER } from '@vubon/shared-constants/platform/notification';
import { InvalidPushProviderError } from '../../errors/delivery.errors.js';

type PushProviderValue = (typeof PUSH_PROVIDER)[keyof typeof PUSH_PROVIDER];
const ALLOWED = Object.values(PUSH_PROVIDER) as readonly string[];

export class PushProviderVO extends BaseTypeVO<PushProviderValue> {
  private constructor(value: PushProviderValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): PushProviderVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidPushProviderError(raw, ALLOWED);
    }
    return new PushProviderVO(raw as PushProviderValue);
  }

  static reconstitute(raw: string): PushProviderVO {
    return new PushProviderVO(raw as PushProviderValue);
  }

  static fcm(): PushProviderVO { return new PushProviderVO(PUSH_PROVIDER.FCM); }
  static apns(): PushProviderVO { return new PushProviderVO(PUSH_PROVIDER.APNS); }
  static webPush(): PushProviderVO { return new PushProviderVO(PUSH_PROVIDER.WEB_PUSH); }
  static onesignal(): PushProviderVO { return new PushProviderVO(PUSH_PROVIDER.ONESIGNAL); }
  static expo(): PushProviderVO { return new PushProviderVO(PUSH_PROVIDER.EXPO); }
  static custom(): PushProviderVO { return new PushProviderVO(PUSH_PROVIDER.CUSTOM); }

  isNative(): boolean {
    return this.value === PUSH_PROVIDER.FCM || this.value === PUSH_PROVIDER.APNS;
  }

  isWeb(): boolean {
    return this.value === PUSH_PROVIDER.WEB_PUSH;
  }
}
