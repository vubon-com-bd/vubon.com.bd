import { ActionUrlVO } from '@domain/primitives/action-url.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('ActionUrlVO', () => {
  it.each(['https://example.com', 'http://example.com', 'mailto:a@b.com', 'tel:+123'])(
    'accepts "%s"',
    (u) => {
      expect(ActionUrlVO.create(u).value).toBe(u);
    },
  );

  it('rejects empty', () => {
    expect(() => ActionUrlVO.create('')).toThrow(ValidationError);
  });

  it('rejects non-URL', () => {
    expect(() => ActionUrlVO.create('not a url')).toThrow(ValidationError);
  });

  it('rejects ftp', () => {
    expect(() => ActionUrlVO.create('ftp://example.com')).toThrow(ValidationError);
  });

  it('isExternal for http/https', () => {
    expect(ActionUrlVO.create('https://example.com').isExternal).toBe(true);
    expect(ActionUrlVO.create('mailto:a@b.com').isExternal).toBe(false);
  });

  it('protocol getter', () => {
    expect(ActionUrlVO.create('https://example.com').protocol).toBe('https:');
  });
});
