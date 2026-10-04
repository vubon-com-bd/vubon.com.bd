import { CHECKOUT_CONFIG } from '../../../../src/module/infrastructure/config/checkout.config.js';
import { CHECKOUT_LIMIT } from '@vubon/shared-constants/business/checkout';

describe('CHECKOUT_CONFIG', () => {
  it('exposes SESSION_TTL_SECONDS', () => {
    expect(CHECKOUT_CONFIG.SESSION_TTL_SECONDS).toBe(CHECKOUT_LIMIT.SESSION_TTL_SECONDS);
  });

  it('exposes MAX_ATTEMPTS', () => {
    expect(CHECKOUT_CONFIG.MAX_ATTEMPTS).toBe(CHECKOUT_LIMIT.MAX_ATTEMPTS);
  });

  it('exposes boolean flags', () => {
    expect(typeof CHECKOUT_CONFIG.ALLOW_GUEST).toBe('boolean');
    expect(typeof CHECKOUT_CONFIG.REQUIRE_EMAIL).toBe('boolean');
  });

  it('frozen', () => {
    expect(Object.isFrozen(CHECKOUT_CONFIG)).toBe(true);
  });
});
