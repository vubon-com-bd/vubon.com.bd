import { describe, it, expect } from '@jest/globals';
import { BroadcastTypeVO } from '../../../../src/module/domain/value-objects/primitives/broadcast-type.vo.js';

describe('BroadcastTypeVO', () => {
  it('create + reconstitute', () => {
    expect(BroadcastTypeVO.create('all_users').value).toBe('all_users');
    expect(() => BroadcastTypeVO.create('bad')).toThrow();
    expect(BroadcastTypeVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(BroadcastTypeVO.allUsers().value).toBe('all_users');
    expect(BroadcastTypeVO.segment().value).toBe('segment');
    expect(BroadcastTypeVO.roleBased().value).toBe('role_based');
    expect(BroadcastTypeVO.locationBased().value).toBe('location_based');
    expect(BroadcastTypeVO.behaviorBased().value).toBe('behavior_based');
    expect(BroadcastTypeVO.customList().value).toBe('custom_list');
  });
  it('targetsAllUsers + requiresSegmentDefinition', () => {
    expect(BroadcastTypeVO.allUsers().targetsAllUsers()).toBe(true);
    expect(BroadcastTypeVO.segment().requiresSegmentDefinition()).toBe(true);
  });
});
