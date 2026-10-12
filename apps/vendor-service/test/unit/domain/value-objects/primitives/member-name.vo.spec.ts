import { MemberNameVO } from '../../../../../src/module/domain/value-objects/primitives/member-name.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('MemberNameVO', () => {
  it('accepts valid name', () => {
    expect(MemberNameVO.create('Md. Rahim Uddin').value).toBe('Md. Rahim Uddin');
  });

  it('normalizes whitespace', () => {
    expect(MemberNameVO.create('  Md.   Rahim  ').value).toBe('Md. Rahim');
  });

  it('allows hyphen/apostrophe', () => {
    expect(MemberNameVO.create("O'Brien-Smith").value).toBe("O'Brien-Smith");
  });

  it('throws on too short', () => {
    expect(() => MemberNameVO.create('A')).toThrow(ValidationError);
  });

  it('throws on too long', () => {
    expect(() => MemberNameVO.create('A'.repeat(200))).toThrow(ValidationError);
  });

  it('throws on digits', () => {
    expect(() => MemberNameVO.create('Rahim123')).toThrow(ValidationError);
  });

  it('throws on non-string', () => {
    expect(() => MemberNameVO.create(123 as unknown as string)).toThrow(ValidationError);
  });
});
