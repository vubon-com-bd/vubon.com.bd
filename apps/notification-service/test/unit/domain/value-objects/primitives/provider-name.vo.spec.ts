import { ProviderNameVO } from '@domain/primitives/provider-name.vo.js';
import { InvalidProviderNameError } from '@domain/errors/provider.errors.js';

describe('ProviderNameVO', () => {
  it('accepts known provider', () => {
    const vo = ProviderNameVO.create('sendgrid');
    expect(vo.value).toBe('sendgrid');
    expect(vo.isKnown()).toBe(true);
  });

  it('accepts unknown provider', () => {
    const vo = ProviderNameVO.create('custom-provider');
    expect(vo.value).toBe('custom-provider');
    expect(vo.isKnown()).toBe(false);
  });

  it('normalizes lowercase', () => {
    expect(ProviderNameVO.create('SENDGRID').value).toBe('sendgrid');
  });

  it('rejects invalid chars', () => {
    expect(() => ProviderNameVO.create('bad name!')).toThrow(InvalidProviderNameError);
  });

  it('rejects too short', () => {
    expect(() => ProviderNameVO.create('a')).toThrow(InvalidProviderNameError);
  });

  it('rejects too long', () => {
    expect(() => ProviderNameVO.create('a'.repeat(51))).toThrow(InvalidProviderNameError);
  });

  it('rejects non-string', () => {
    expect(() => ProviderNameVO.create(null as any)).toThrow(InvalidProviderNameError);
  });

  it('rejects if not in allowed list', () => {
    expect(() =>
      ProviderNameVO.create('unknown', ['sendgrid', 'mailgun']),
    ).toThrow(InvalidProviderNameError);
  });
});
