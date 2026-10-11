import { describe, it, expect } from '@jest/globals';
import { NotificationActionEntryVO } from '../../../../../src/module/domain/value-objects/composites/notification-action-entry.vo.js';
import { NotificationActionVO } from '../../../../../src/module/domain/value-objects/primitives/notification-action.vo.js';
import { NotificationActionTypeVO } from '../../../../../src/module/domain/value-objects/primitives/notification-action-type.vo.js';
import { ActionUrlVO } from '../../../../../src/module/domain/value-objects/primitives/action-url.vo.js';

describe('NotificationActionEntryVO', () => {
  it('create minimal', () => {
    const vo = NotificationActionEntryVO.create({
      action: NotificationActionVO.accept(),
      type: NotificationActionTypeVO.primary(),
      label: 'Accept',
    });
    expect(vo.label).toBe('Accept');
    expect(vo.hasUrl()).toBe(false);
  });
  it('rejects empty label', () => {
    expect(() =>
      NotificationActionEntryVO.create({
        action: NotificationActionVO.accept(),
        type: NotificationActionTypeVO.primary(),
        label: '',
      }),
    ).toThrow();
  });
  it('rejects label > 40 chars', () => {
    expect(() =>
      NotificationActionEntryVO.create({
        action: NotificationActionVO.accept(),
        type: NotificationActionTypeVO.primary(),
        label: 'x'.repeat(41),
      }),
    ).toThrow();
  });
  it('requires URL for view action', () => {
    expect(() =>
      NotificationActionEntryVO.create({
        action: NotificationActionVO.view(),
        type: NotificationActionTypeVO.primary(),
        label: 'View',
      }),
    ).toThrow();
  });
  it('create with url', () => {
    const vo = NotificationActionEntryVO.create({
      action: NotificationActionVO.view(),
      type: NotificationActionTypeVO.primary(),
      label: 'View',
      url: ActionUrlVO.create('https://x.com'),
    });
    expect(vo.hasUrl()).toBe(true);
  });
  it('reconstitute', () => {
    const vo = NotificationActionEntryVO.reconstitute({
      action: NotificationActionVO.accept(),
      type: NotificationActionTypeVO.primary(),
      label: 'x',
    });
    expect(vo.label).toBe('x');
  });
});
