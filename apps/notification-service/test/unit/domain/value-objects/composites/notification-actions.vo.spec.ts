import { describe, it, expect } from '@jest/globals';
import { NotificationActionsVO } from '../../../../../src/module/domain/value-objects/composites/notification-actions.vo.js';
import { NotificationActionEntryVO } from '../../../../../src/module/domain/value-objects/composites/notification-action-entry.vo.js';
import { NotificationActionVO } from '../../../../../src/module/domain/value-objects/primitives/notification-action.vo.js';
import { NotificationActionTypeVO } from '../../../../../src/module/domain/value-objects/primitives/notification-action-type.vo.js';

function makeEntry(label: string, type = NotificationActionTypeVO.primary()) {
  return NotificationActionEntryVO.reconstitute({
    action: NotificationActionVO.accept(),
    type,
    label,
  });
}

describe('NotificationActionsVO', () => {
  it('create valid list', () => {
    const vo = NotificationActionsVO.create([makeEntry('A'), makeEntry('B')]);
    expect(vo.count).toBe(2);
    expect(vo.isEmpty()).toBe(false);
  });
  it('empty factory', () => {
    expect(NotificationActionsVO.empty().isEmpty()).toBe(true);
  });
  it('rejects > 5 actions', () => {
    expect(() =>
      NotificationActionsVO.create([
        makeEntry('1'), makeEntry('2'), makeEntry('3'), makeEntry('4'), makeEntry('5'), makeEntry('6'),
      ]),
    ).toThrow();
  });
  it('rejects duplicate labels', () => {
    expect(() => NotificationActionsVO.create([makeEntry('A'), makeEntry('A')])).toThrow();
  });
  it('primaryAction finds primary', () => {
    const vo = NotificationActionsVO.create([
      makeEntry('Secondary', NotificationActionTypeVO.secondary()),
      makeEntry('Main', NotificationActionTypeVO.primary()),
    ]);
    expect(vo.primaryAction()?.label).toBe('Main');
  });
  it('hasDangerAction', () => {
    const vo = NotificationActionsVO.create([
      makeEntry('Delete', NotificationActionTypeVO.danger()),
    ]);
    expect(vo.hasDangerAction()).toBe(true);
  });
  it('reconstitute', () => {
    const vo = NotificationActionsVO.reconstitute([makeEntry('X')]);
    expect(vo.count).toBe(1);
  });
});
