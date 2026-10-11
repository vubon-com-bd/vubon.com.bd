import { describe, it, expect } from '@jest/globals';
import { PushPlatformVO } from '../../../../src/module/domain/value-objects/primitives/push-platform.vo.js';

describe('PushPlatformVO', () => {
  it('create + reconstitute', () => {
    expect(PushPlatformVO.create('android').value).toBe('android');
    expect(() => PushPlatformVO.create('bad')).toThrow();
    expect(PushPlatformVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(PushPlatformVO.android().value).toBe('android');
    expect(PushPlatformVO.ios().value).toBe('ios');
    expect(PushPlatformVO.web().value).toBe('web');
    expect(PushPlatformVO.windows().value).toBe('windows');
    expect(PushPlatformVO.macos().value).toBe('macos');
  });
  it('predicates + usesApns/Fcm', () => {
    expect(PushPlatformVO.android().isAndroid()).toBe(true);
    expect(PushPlatformVO.ios().isIos()).toBe(true);
    expect(PushPlatformVO.web().isWeb()).toBe(true);
    expect(PushPlatformVO.ios().usesApns()).toBe(true);
    expect(PushPlatformVO.macos().usesApns()).toBe(true);
    expect(PushPlatformVO.android().usesFcm()).toBe(true);
  });
});
