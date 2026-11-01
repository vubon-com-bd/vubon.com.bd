import { ProviderMessageIdVO } from '@domain/primitives/provider-message-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('ProviderMessageIdVO', () => {
  it('accepts valid id', () => {
    expect(ProviderMessageIdVO.create('msg-abc-123').value).toBe('msg-abc-123');
  });

  it('trims whitespace', () => {
    expect(ProviderMessageIdVO.create('  abc  ').value).toBe('abc');
  });

  it('rejects empty', () => {
    expect(() => ProviderMessageIdVO.create('')).toThrow(ValidationError);
  });

  it('rejects non-string', () => {
    expect(() => ProviderMessageIdVO.create(42 as any)).toThrow(ValidationError);
  });

  it('rejects too long (>256)', () => {
    expect(() => ProviderMessageIdVO.create('a'.repeat(257))).toThrow(ValidationError);
  });

  it('reconstitute', () => {
    expect(ProviderMessageIdVO.reconstitute('x').value).toBe('x');
  });
});
