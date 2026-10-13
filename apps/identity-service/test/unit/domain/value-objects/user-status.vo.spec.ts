/**
 * UserStatusVO — Unit Tests
 */
import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, jest } from '@jest/globals';
import { UserStatusVO } from '../../../../src/module/domain/value-objects/primitives/user-status.vo.js';

describe('UserStatusVO', () => {
  describe('create()', () => {
    it('creates valid status', () => {
      expect(UserStatusVO.create('active').value).toBe('active');
    });

    it('normalizes case', () => {
      expect(UserStatusVO.create('ACTIVE').value).toBe('active');
    });

    it('throws for invalid status', () => {
      expect(() => UserStatusVO.create('invalid')).toThrow();
    });
  });

  describe('static factories', () => {
    it('pending()', () => expect(UserStatusVO.pending().value).toBe('pending'));
    it('active()', () => expect(UserStatusVO.active().value).toBe('active'));
    it('inactive()', () => expect(UserStatusVO.inactive().value).toBe('inactive'));
    it('suspended()', () => expect(UserStatusVO.suspended().value).toBe('suspended'));
    it('blocked()', () => expect(UserStatusVO.blocked().value).toBe('blocked'));
    it('deleted()', () => expect(UserStatusVO.deleted().value).toBe('deleted'));
    it('deactivated()', () => expect(UserStatusVO.deactivated().value).toBe('deactivated'));
  });

  describe('predicates', () => {
    it('isFinal() true for deleted', () => {
      expect(UserStatusVO.deleted().isFinal()).toBe(true);
      expect(UserStatusVO.active().isFinal()).toBe(false);
    });

    it('canLogin() true for active', () => {
      expect(UserStatusVO.active().canLogin()).toBe(true);
      expect(UserStatusVO.pending().canLogin()).toBe(false);
      expect(UserStatusVO.suspended().canLogin()).toBe(false);
    });
  });

  describe('canTransitionTo()', () => {
    it('pending → active', () => {
      expect(UserStatusVO.pending().canTransitionTo('active')).toBe(true);
    });

    it('active → suspended', () => {
      expect(UserStatusVO.active().canTransitionTo('suspended')).toBe(true);
    });

    it('deleted → anything not allowed', () => {
      expect(UserStatusVO.deleted().canTransitionTo('active')).toBe(false);
    });
  });
});
