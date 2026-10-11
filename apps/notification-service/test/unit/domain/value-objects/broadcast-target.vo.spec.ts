import { describe, it, expect } from '@jest/globals';
import { BroadcastTargetVO } from '../../../../src/module/domain/value-objects/primitives/broadcast-target.vo.js';

describe('BroadcastTargetVO', () => {
  it('create + reconstitute', () => {
    expect(BroadcastTargetVO.create('all').value).toBe('all');
    expect(() => BroadcastTargetVO.create('bad')).toThrow();
    expect(BroadcastTargetVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(BroadcastTargetVO.all().value).toBe('all');
    expect(BroadcastTargetVO.activeUsers().value).toBe('active_users');
    expect(BroadcastTargetVO.inactiveUsers().value).toBe('inactive_users');
    expect(BroadcastTargetVO.newUsers().value).toBe('new_users');
    expect(BroadcastTargetVO.premiumUsers().value).toBe('premium_users');
    expect(BroadcastTargetVO.vendors().value).toBe('vendors');
    expect(BroadcastTargetVO.customers().value).toBe('customers');
    expect(BroadcastTargetVO.admins().value).toBe('admins');
    expect(BroadcastTargetVO.custom().value).toBe('custom');
  });
  it('predicates', () => {
    expect(BroadcastTargetVO.all().isAll()).toBe(true);
    expect(BroadcastTargetVO.custom().isCustom()).toBe(true);
  });
});
