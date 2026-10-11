import { describe, it, expect } from '@jest/globals';
import { PushProviderVO } from '../../../../src/module/domain/value-objects/primitives/push-provider.vo.js';

describe('PushProviderVO', () => {
  it('create + reconstitute', () => {
    expect(PushProviderVO.create('fcm').value).toBe('fcm');
    expect(() => PushProviderVO.create('bad')).toThrow();
    expect(PushProviderVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(PushProviderVO.fcm().value).toBe('fcm');
    expect(PushProviderVO.apns().value).toBe('apns');
    expect(PushProviderVO.webPush().value).toBe('web_push');
    expect(PushProviderVO.onesignal().value).toBe('onesignal');
    expect(PushProviderVO.expo().value).toBe('expo');
    expect(PushProviderVO.custom().value).toBe('custom');
  });
  it('predicates', () => {
    expect(PushProviderVO.fcm().isNative()).toBe(true);
    expect(PushProviderVO.apns().isNative()).toBe(true);
    expect(PushProviderVO.webPush().isWeb()).toBe(true);
  });
});
