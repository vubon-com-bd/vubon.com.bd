import { describe, it, expect } from '@jest/globals';
import { ProviderError } from '../../../../src/module/domain/errors/delivery.errors.js';

describe('ProviderError — code branch', () => {
  it('with code → includes [code]', () => {
    const e = new ProviderError('sendgrid', 'server error', 'E001');
    expect(e.message).toContain('[E001]');
  });

  it('without code → no [code]', () => {
    const e = new ProviderError('sendgrid', 'server error');
    expect(e.message).not.toContain('[');
  });
});
