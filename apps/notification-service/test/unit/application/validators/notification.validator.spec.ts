import { describe, it, expect } from '@jest/globals';
import { NotificationValidator } from '../../../../src/module/application/validators/notification.validator.js';

const validNotification = {
  id: '00000000-0000-0000-0000-000000000001',
  userId: '00000000-0000-0000-0000-000000000002',
  type: 'transactional',
  category: 'order',
  channel: 'email',
  priority: 'normal',
  status: 'pending',
  title: 'T',
  body: 'B',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('NotificationValidator', () => {
  it('validateNotification ok', () => {
    expect(() => NotificationValidator.validateNotification(validNotification)).not.toThrow();
  });

  it('validateNotification fails', () => {
    expect(() => NotificationValidator.validateNotification({})).toThrow();
  });

  it('validateListFilter ok', () => {
    expect(() => NotificationValidator.validateListFilter({ userId: '00000000-0000-0000-0000-000000000001' })).not.toThrow();
  });

  it('validateListFilter fails with invalid UUID', () => {
    expect(() => NotificationValidator.validateListFilter({ userId: 'not-uuid' })).toThrow();
  });

  it('validateType ok', () => {
    expect(NotificationValidator.validateType('transactional')).toBe('transactional');
  });

  it('validateType fails', () => {
    expect(() => NotificationValidator.validateType('bad')).toThrow();
  });

  it('validateChannel ok', () => {
    expect(NotificationValidator.validateChannel('email')).toBe('email');
  });

  it('validateChannel fails', () => {
    expect(() => NotificationValidator.validateChannel('bad')).toThrow();
  });

  it('validatePriority ok', () => {
    expect(NotificationValidator.validatePriority('normal')).toBe('normal');
  });

  it('validatePriority fails', () => {
    expect(() => NotificationValidator.validatePriority('bad')).toThrow();
  });

  it('validateCategory ok', () => {
    expect(NotificationValidator.validateCategory('order')).toBe('order');
  });

  it('validateCategory fails', () => {
    expect(() => NotificationValidator.validateCategory('bad')).toThrow();
  });
});
