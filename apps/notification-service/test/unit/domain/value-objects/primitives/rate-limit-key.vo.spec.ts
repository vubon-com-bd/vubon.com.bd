import { RateLimitKeyVO } from '@domain/primitives/rate-limit-key.vo.js';
import { InvalidRateLimitKeyError } from '@domain/errors/rate-limit.errors.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('RateLimitKeyVO', () => {
  it('accepts global scope (no identifier)', () => {
    const vo = RateLimitKeyVO.create({ channel: 'email', scope: 'global' });
    expect(vo.scope).toBe('global');
    expect(vo.toKeyString()).toBe('rl:email:global');
  });

  it('accepts user scope with identifier', () => {
    const vo = RateLimitKeyVO.create({
      channel: 'email',
      scope: 'user',
      identifier: IDS.userId,
    });
    expect(vo.toKeyString()).toBe(`rl:email:user:${IDS.userId}`);
  });

  it('rejects invalid channel', () => {
    expect(() =>
      RateLimitKeyVO.create({ channel: 'pigeon' as any, scope: 'global' }),
    ).toThrow(InvalidRateLimitKeyError);
  });

  it('rejects invalid scope', () => {
    expect(() =>
      RateLimitKeyVO.create({ channel: 'email', scope: 'everywhere' as any }),
    ).toThrow(InvalidRateLimitKeyError);
  });

  it('rejects user scope without identifier', () => {
    expect(() =>
      RateLimitKeyVO.create({ channel: 'email', scope: 'user' }),
    ).toThrow(InvalidRateLimitKeyError);
  });

  it('rejects invalid identifier chars', () => {
    expect(() =>
      RateLimitKeyVO.create({
        channel: 'email',
        scope: 'user',
        identifier: 'bad id!',
      }),
    ).toThrow(InvalidRateLimitKeyError);
  });

  it('channel scope works without identifier', () => {
    const vo = RateLimitKeyVO.create({ channel: 'sms', scope: 'channel' });
    expect(vo.toKeyString()).toBe('rl:sms:channel');
  });
});
