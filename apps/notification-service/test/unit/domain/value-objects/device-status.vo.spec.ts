import { describe, it, expect } from '@jest/globals';
import { DeviceStatusVO } from '../../../../src/module/domain/value-objects/primitives/device-status.vo.js';

describe('DeviceStatusVO', () => {
  it('create + reconstitute', () => {
    expect(DeviceStatusVO.create('active').value).toBe('active');
    expect(() => DeviceStatusVO.create('bad')).toThrow();
    expect(DeviceStatusVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(DeviceStatusVO.active().value).toBe('active');
    expect(DeviceStatusVO.inactive().value).toBe('inactive');
    expect(DeviceStatusVO.unregistered().value).toBe('unregistered');
    expect(DeviceStatusVO.blocked().value).toBe('blocked');
    expect(DeviceStatusVO.invalid().value).toBe('invalid');
  });
  it('predicates + helpers', () => {
    expect(DeviceStatusVO.active().isActive()).toBe(true);
    expect(DeviceStatusVO.inactive().isInactive()).toBe(true);
    expect(DeviceStatusVO.unregistered().isUnregistered()).toBe(true);
    expect(DeviceStatusVO.blocked().isBlocked()).toBe(true);
    expect(DeviceStatusVO.invalid().isInvalid()).toBe(true);
    expect(DeviceStatusVO.active().canReceivePush()).toBe(true);
    expect(DeviceStatusVO.blocked().canReceivePush()).toBe(false);
    expect(DeviceStatusVO.unregistered().isTerminal()).toBe(true);
    expect(DeviceStatusVO.blocked().isTerminal()).toBe(true);
    expect(DeviceStatusVO.invalid().isTerminal()).toBe(true);
  });
});
