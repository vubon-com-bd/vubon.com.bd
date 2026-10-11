import { describe, it, expect } from '@jest/globals';
import { NotificationTitleVO } from '../../../../src/module/domain/value-objects/primitives/notification-title.vo.js';

describe('NotificationTitleVO', () => {
  it('create valid', () => {
    expect(NotificationTitleVO.create('Hello').value).toBe('Hello');
  });
  it('trims whitespace', () => {
    expect(NotificationTitleVO.create('  hi  ').value).toBe('hi');
  });
  it('rejects empty', () => {
    expect(() => NotificationTitleVO.create('')).toThrow();
  });
  it('rejects > 200 chars', () => {
    expect(() => NotificationTitleVO.create('x'.repeat(201))).toThrow();
  });
  it('reconstitute', () => {
    expect(NotificationTitleVO.reconstitute('any').value).toBe('any');
  });
  it('length getter', () => {
    expect(NotificationTitleVO.create('hello').length).toBe(5);
  });
});
