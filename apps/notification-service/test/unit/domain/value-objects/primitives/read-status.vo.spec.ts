import { ReadStatusVO } from '@domain/primitives/read-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('ReadStatusVO', () => {
  it.each(['unread', 'read', 'archived', 'deleted', 'starred', 'snoozed'])('accepts "%s"', (s) => {
    expect(ReadStatusVO.create(s).value).toBe(s);
  });

  it('rejects invalid', () => {
    expect(() => ReadStatusVO.create('dunno')).toThrow(ValidationError);
  });

  it('rejects non-string', () => {
    expect(() => ReadStatusVO.create(1 as any)).toThrow(ValidationError);
  });

  it('factory + predicates', () => {
    expect(ReadStatusVO.unread().isUnread()).toBe(true);
    expect(ReadStatusVO.read().isRead()).toBe(true);
    expect(ReadStatusVO.archived().isArchived()).toBe(true);
    expect(ReadStatusVO.deleted().isDeleted()).toBe(true);
    expect(ReadStatusVO.create('starred').isStarred()).toBe(true);
    expect(ReadStatusVO.create('snoozed').isSnoozed()).toBe(true);
  });

  it('isVisible false only for deleted', () => {
    expect(ReadStatusVO.deleted().isVisible()).toBe(false);
    expect(ReadStatusVO.unread().isVisible()).toBe(true);
    expect(ReadStatusVO.read().isVisible()).toBe(true);
  });
});
