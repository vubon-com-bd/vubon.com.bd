import { describe, it, expect } from '@jest/globals';
import { NotificationBodyVO } from '../../../../src/module/domain/value-objects/primitives/notification-body.vo.js';

describe('NotificationBodyVO', () => {
  it('create valid', () => {
    expect(NotificationBodyVO.create('Body text').value).toBe('Body text');
  });
  it('rejects empty', () => {
    expect(() => NotificationBodyVO.create('')).toThrow();
  });
  it('rejects > 5000 chars', () => {
    expect(() => NotificationBodyVO.create('x'.repeat(5001))).toThrow();
  });
  it('reconstitute', () => {
    expect(NotificationBodyVO.reconstitute('any').value).toBe('any');
  });
});
