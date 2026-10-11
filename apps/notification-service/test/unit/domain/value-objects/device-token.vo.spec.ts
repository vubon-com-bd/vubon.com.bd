import { describe, it, expect } from '@jest/globals';
import { DeviceTokenVO } from '../../../../src/module/domain/value-objects/primitives/device-token.vo.js';

describe('DeviceTokenVO', () => {
  it('create valid', () => {
    const vo = DeviceTokenVO.create('abcdefghijklmnop1234');
    expect(vo.length).toBe(20);
  });
  it('rejects empty', () => expect(() => DeviceTokenVO.create('')).toThrow());
  it('rejects short', () => expect(() => DeviceTokenVO.create('short')).toThrow());
  it('rejects invalid chars', () => expect(() => DeviceTokenVO.create('invalid token!')).toThrow());
  it('reconstitute', () => expect(DeviceTokenVO.reconstitute('any').value).toBe('any'));
  it('masked hides middle', () => {
    const vo = DeviceTokenVO.create('abcdefghijklmnop1234');
    const m = vo.masked();
    expect(m).toContain('...');
  });
  it('masked short returns ***', () => {
    const vo = DeviceTokenVO.reconstitute('abc');
    expect(vo.masked()).toBe('***');
  });
});
