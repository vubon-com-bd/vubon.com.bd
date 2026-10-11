import { describe, it, expect } from '@jest/globals';
import { NotificationActionTypeVO } from '../../../../src/module/domain/value-objects/primitives/notification-action-type.vo.js';

describe('NotificationActionTypeVO', () => {
  it('create + reconstitute', () => {
    expect(NotificationActionTypeVO.create('primary').value).toBe('primary');
    expect(() => NotificationActionTypeVO.create('bad')).toThrow();
    expect(NotificationActionTypeVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(NotificationActionTypeVO.primary().value).toBe('primary');
    expect(NotificationActionTypeVO.secondary().value).toBe('secondary');
    expect(NotificationActionTypeVO.danger().value).toBe('danger');
    expect(NotificationActionTypeVO.link().value).toBe('link');
    expect(NotificationActionTypeVO.button().value).toBe('button');
  });
  it('predicates', () => {
    expect(NotificationActionTypeVO.primary().isPrimary()).toBe(true);
    expect(NotificationActionTypeVO.danger().isDanger()).toBe(true);
  });
});
