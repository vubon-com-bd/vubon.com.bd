import { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('PreferenceIdVO', () => {
  it('accepts valid', () => {
    expect(PreferenceIdVO.create(IDS.preferenceId).value).toBe(IDS.preferenceId);
  });
  it('rejects empty', () => {
    expect(() => PreferenceIdVO.create('')).toThrow(ValidationError);
  });
  it('rejects bad', () => {
    expect(() => PreferenceIdVO.create('xx')).toThrow(ValidationError);
  });
});
