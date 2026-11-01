import { ReadAtVO } from '@domain/primitives/read-at.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('ReadAtVO', () => {
  it('accepts undefined', () => {
    const vo = ReadAtVO.create(undefined);
    expect(vo.isPresent).toBe(false);
    expect(vo.date).toBeUndefined();
  });

  it('accepts valid past ISO', () => {
    const past = new Date(Date.now() - 60_000).toISOString();
    const vo = ReadAtVO.create(past);
    expect(vo.isPresent).toBe(true);
    expect(vo.date).toBeInstanceOf(Date);
  });

  it('accepts Date object', () => {
    const vo = ReadAtVO.create(new Date(Date.now() - 60_000));
    expect(vo.isPresent).toBe(true);
  });

  it('rejects invalid string', () => {
    expect(() => ReadAtVO.create('garbage')).toThrow(ValidationError);
  });

  it('rejects future', () => {
    const future = new Date(Date.now() + 3_600_000).toISOString();
    expect(() => ReadAtVO.create(future)).toThrow(ValidationError);
  });

  it('reconstitute skips validation', () => {
    expect(ReadAtVO.reconstitute(undefined).isPresent).toBe(false);
  });
});
