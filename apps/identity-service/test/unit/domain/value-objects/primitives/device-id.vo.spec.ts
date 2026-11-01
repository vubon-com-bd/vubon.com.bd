/**
 * DeviceIdVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { DeviceIdVO } from '@domain/value-objects/primitives/device-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS } from '@fixtures/index';

describe('DeviceIdVO', () => {
  it('should create valid', () => {
    expect(DeviceIdVO.create(TEST_IDS.DEVICE_ID).value).toBe(TEST_IDS.DEVICE_ID);
  });

  it('should throw on empty', () => {
    expect(() => DeviceIdVO.create('')).toThrow(ValidationError);
  });

  it('should throw on invalid UUID', () => {
    expect(() => DeviceIdVO.create('nope')).toThrow(/valid UUID/);
  });

  it('should reconstitute without validation', () => {
    expect(DeviceIdVO.reconstitute('x').value).toBe('x');
  });
});
