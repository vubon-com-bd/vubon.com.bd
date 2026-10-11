import { describe, it, expect } from '@jest/globals';
import { InAppTypeVO } from '../../../../src/module/domain/value-objects/primitives/in-app-type.vo.js';

describe('InAppTypeVO', () => {
  it('create + reconstitute', () => {
    expect(InAppTypeVO.create('toast').value).toBe('toast');
    expect(() => InAppTypeVO.create('bad')).toThrow();
    expect(InAppTypeVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(InAppTypeVO.toast().value).toBe('toast');
    expect(InAppTypeVO.banner().value).toBe('banner');
    expect(InAppTypeVO.modal().value).toBe('modal');
    expect(InAppTypeVO.snackbar().value).toBe('snackbar');
    expect(InAppTypeVO.popup().value).toBe('popup');
    expect(InAppTypeVO.badge().value).toBe('badge');
    expect(InAppTypeVO.inbox().value).toBe('inbox');
    expect(InAppTypeVO.bell().value).toBe('bell');
    expect(InAppTypeVO.fullScreen().value).toBe('full_screen');
  });
  it('predicates', () => {
    expect(InAppTypeVO.modal().isBlocking()).toBe(true);
    expect(InAppTypeVO.fullScreen().isBlocking()).toBe(true);
    expect(InAppTypeVO.popup().isBlocking()).toBe(true);
    expect(InAppTypeVO.toast().isTransient()).toBe(true);
    expect(InAppTypeVO.snackbar().isTransient()).toBe(true);
    expect(InAppTypeVO.banner().isTransient()).toBe(true);
    expect(InAppTypeVO.inbox().isPersistent()).toBe(true);
    expect(InAppTypeVO.bell().isPersistent()).toBe(true);
  });
});
