import { describe, it, expect } from '@jest/globals';
import { DeviceIdVO } from '../../../../src/module/domain/value-objects/primitives/device-id.vo.js';
import { makeUuid } from '../../../helpers/test-factories.js';

describe('DeviceIdVO', () => {
  it('create valid', () => expect(DeviceIdVO.create(makeUuid()).value).toBeDefined());
  it('rejects empty', () => expect(() => DeviceIdVO.create('')).toThrow());
  it('rejects bad', () => expect(() => DeviceIdVO.create('x')).toThrow());
  it('reconstitute', () => expect(DeviceIdVO.reconstitute('any').value).toBe('any'));
});
