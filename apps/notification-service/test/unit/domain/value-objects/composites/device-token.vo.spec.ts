import { DeviceTokensVO } from '@domain/composites/device-token.vo.js';
import { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';
import { DevicePlatformVO } from '@domain/primitives/device-platform.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const entry = (tokenValue: string, platform: 'android' | 'ios' | 'web') => ({
  token: DeviceTokenVO.create(tokenValue),
  platform: DevicePlatformVO.create(platform),
});

const ANDROID = IDS.deviceToken;
const IOS = IDS.deviceToken2;
const WEB = 'web_token_' + 'a'.repeat(30);

describe('DeviceTokensVO', () => {
  describe('create()', () => {
    it('accepts empty entries', () => {
      const vo = DeviceTokensVO.create({ entries: [], maxTokens: 10 });
      expect(vo.count).toBe(0);
      expect(vo.isEmpty).toBe(true);
    });

    it('accepts multiple entries', () => {
      const vo = DeviceTokensVO.create({
        entries: [entry(ANDROID, 'android'), entry(IOS, 'ios')],
        maxTokens: 10,
      });
      expect(vo.count).toBe(2);
    });

    it('rejects maxTokens < 1', () => {
      expect(() => DeviceTokensVO.create({ entries: [], maxTokens: 0 })).toThrow(ValidationError);
    });

    it('rejects maxTokens > 100', () => {
      expect(() =>
        DeviceTokensVO.create({ entries: [], maxTokens: 101 }),
      ).toThrow(ValidationError);
    });

    it('rejects entries > maxTokens', () => {
      expect(() =>
        DeviceTokensVO.create({
          entries: [entry(ANDROID, 'android'), entry(IOS, 'ios')],
          maxTokens: 1,
        }),
      ).toThrow(ValidationError);
    });

    it('rejects duplicate tokens', () => {
      expect(() =>
        DeviceTokensVO.create({
          entries: [entry(ANDROID, 'android'), entry(ANDROID, 'android')],
          maxTokens: 10,
        }),
      ).toThrow(ValidationError);
    });

    it('empty() factory', () => {
      const vo = DeviceTokensVO.empty();
      expect(vo.count).toBe(0);
      expect(vo.maxTokens).toBe(10);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = DeviceTokensVO.reconstitute({ entries: [], maxTokens: 5 });
      expect(vo.maxTokens).toBe(5);
    });
  });

  describe('platform filters', () => {
    const vo = DeviceTokensVO.create({
      entries: [entry(ANDROID, 'android'), entry(IOS, 'ios'), entry(WEB, 'web')],
      maxTokens: 10,
    });

    it('androidTokens', () => {
      expect(vo.androidTokens.length).toBe(1);
    });

    it('iosTokens', () => {
      expect(vo.iosTokens.length).toBe(1);
    });

    it('webTokens', () => {
      expect(vo.webTokens.length).toBe(1);
    });
  });

  describe('has', () => {
    const vo = DeviceTokensVO.create({
      entries: [entry(ANDROID, 'android')],
      maxTokens: 10,
    });

    it('true for existing', () => {
      expect(vo.has(ANDROID)).toBe(true);
    });

    it('false for missing', () => {
      expect(vo.has('nope')).toBe(false);
    });
  });

  describe('add / remove', () => {
    const base = DeviceTokensVO.create({
      entries: [entry(ANDROID, 'android')],
      maxTokens: 10,
    });

    it('add returns new VO', () => {
      const updated = base.add(entry(IOS, 'ios'));
      expect(updated.count).toBe(2);
    });

    it('remove returns new VO', () => {
      const updated = base.remove(ANDROID);
      expect(updated.count).toBe(0);
    });

    it('remove non-existent no-op', () => {
      const updated = base.remove('nope');
      expect(updated.count).toBe(1);
    });
  });

  describe('allTokens', () => {
    it('returns token string array', () => {
      const vo = DeviceTokensVO.create({
        entries: [entry(ANDROID, 'android'), entry(IOS, 'ios')],
        maxTokens: 10,
      });
      expect(vo.allTokens()).toContain(ANDROID);
      expect(vo.allTokens()).toContain(IOS);
    });
  });

  describe('isFull', () => {
    it('true when count == maxTokens', () => {
      const vo = DeviceTokensVO.create({
        entries: [entry(ANDROID, 'android')],
        maxTokens: 1,
      });
      expect(vo.isFull).toBe(true);
    });

    it('false when not full', () => {
      const vo = DeviceTokensVO.create({
        entries: [entry(ANDROID, 'android')],
        maxTokens: 5,
      });
      expect(vo.isFull).toBe(false);
    });
  });
});
