import { DeviceStatusVO } from '@domain/primitives/device-status.vo.js';
import { InvalidDeviceStatusError } from '@domain/errors/device.errors.js';

describe('DeviceStatusVO', () => {
  it.each(['active', 'inactive', 'unregistered', 'blocked', 'invalid'])('accepts "%s"', (s) => {
    expect(DeviceStatusVO.create(s).value).toBe(s);
  });

  it('rejects invalid', () => {
    expect(() => DeviceStatusVO.create('zombie')).toThrow(InvalidDeviceStatusError);
  });

  describe('factory + predicates', () => {
    it('active / isActive', () => {
      expect(DeviceStatusVO.active().isActive()).toBe(true);
      expect(DeviceStatusVO.active().value).toBe('active');
    });

    it('inactive / isInactive', () => {
      expect(DeviceStatusVO.inactive().isInactive()).toBe(true);
    });

    it('unregistered / isUnregistered', () => {
      expect(DeviceStatusVO.unregistered().isUnregistered()).toBe(true);
    });

    it('blocked / isBlocked', () => {
      expect(DeviceStatusVO.blocked().isBlocked()).toBe(true);
    });

    it('create("invalid").isInvalid()', () => {
      expect(DeviceStatusVO.create('invalid').isInvalid()).toBe(true);
    });
  });

  describe('canReceive', () => {
    it('only active can receive', () => {
      expect(DeviceStatusVO.active().canReceive()).toBe(true);
      expect(DeviceStatusVO.inactive().canReceive()).toBe(false);
      expect(DeviceStatusVO.blocked().canReceive()).toBe(false);
    });
  });

  describe('isTerminal', () => {
    it('unregistered/blocked/invalid', () => {
      expect(DeviceStatusVO.unregistered().isTerminal()).toBe(true);
      expect(DeviceStatusVO.blocked().isTerminal()).toBe(true);
      expect(DeviceStatusVO.create('invalid').isTerminal()).toBe(true);
      expect(DeviceStatusVO.active().isTerminal()).toBe(false);
    });
  });

  describe('canTransitionTo', () => {
    it('active → inactive/unregistered/blocked/invalid', () => {
      const s = DeviceStatusVO.active();
      expect(s.canTransitionTo('inactive')).toBe(true);
      expect(s.canTransitionTo('unregistered')).toBe(true);
      expect(s.canTransitionTo('blocked')).toBe(true);
      expect(s.canTransitionTo('invalid')).toBe(true);
    });
    it('unregistered terminal', () => {
      expect(DeviceStatusVO.unregistered().canTransitionTo('active')).toBe(false);
    });
    it('inactive → active/unregistered/blocked/invalid', () => {
      const s = DeviceStatusVO.inactive();
      expect(s.canTransitionTo('active')).toBe(true);
      expect(s.canTransitionTo('unregistered')).toBe(true);
    });
  });
});
