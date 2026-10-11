import { describe, it, expect } from '@jest/globals';
import { ReadStatusVO } from '../../../../src/module/domain/value-objects/primitives/read-status.vo.js';

describe('ReadStatusVO', () => {
  it('create + reconstitute', () => {
    expect(ReadStatusVO.create('unread').value).toBe('unread');
    expect(() => ReadStatusVO.create('bad')).toThrow();
    expect(ReadStatusVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(ReadStatusVO.unread().value).toBe('unread');
    expect(ReadStatusVO.read().value).toBe('read');
    expect(ReadStatusVO.archived().value).toBe('archived');
    expect(ReadStatusVO.deleted().value).toBe('deleted');
    expect(ReadStatusVO.starred().value).toBe('starred');
    expect(ReadStatusVO.snoozed().value).toBe('snoozed');
  });
  it('predicates', () => {
    expect(ReadStatusVO.unread().isUnread()).toBe(true);
    expect(ReadStatusVO.read().isRead()).toBe(true);
    expect(ReadStatusVO.archived().isArchived()).toBe(true);
    expect(ReadStatusVO.deleted().isDeleted()).toBe(true);
    expect(ReadStatusVO.starred().isStarred()).toBe(true);
    expect(ReadStatusVO.snoozed().isSnoozed()).toBe(true);
  });
  it('isVisibleInInbox', () => {
    expect(ReadStatusVO.unread().isVisibleInInbox()).toBe(true);
    expect(ReadStatusVO.read().isVisibleInInbox()).toBe(true);
    expect(ReadStatusVO.starred().isVisibleInInbox()).toBe(true);
    expect(ReadStatusVO.deleted().isVisibleInInbox()).toBe(false);
  });
});
