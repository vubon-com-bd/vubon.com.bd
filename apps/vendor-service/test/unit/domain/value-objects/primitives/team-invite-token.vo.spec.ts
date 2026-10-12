import { TeamInviteTokenVO } from '../../../../../src/module/domain/value-objects/primitives/team-invite-token.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('TeamInviteTokenVO', () => {
  describe('create()', () => {
    it('accepts valid token', () => {
      const t = 'ABCD1234efgh5678';
      expect(TeamInviteTokenVO.create(t).value).toBe(t);
    });

    it('accepts tokens with _ and -', () => {
      const t = 'ABCD_1234-efgh_5678';
      expect(TeamInviteTokenVO.create(t).value).toBe(t);
    });

    it('trims whitespace', () => {
      expect(TeamInviteTokenVO.create('  ABCDEF1234567890  ').value).toBe('ABCDEF1234567890');
    });

    it('throws on too short', () => {
      expect(() => TeamInviteTokenVO.create('short')).toThrow(ValidationError);
    });

    it('throws on too long', () => {
      expect(() => TeamInviteTokenVO.create('A'.repeat(300))).toThrow(ValidationError);
    });

    it('throws on special chars', () => {
      expect(() => TeamInviteTokenVO.create('ABCD@#$%^&*()1234')).toThrow(ValidationError);
    });

    it('throws on non-string', () => {
      expect(() => TeamInviteTokenVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('isSecure()', () => {
    it('true for 32+ chars', () => {
      expect(TeamInviteTokenVO.create('A'.repeat(32)).isSecure()).toBe(true);
    });

    it('false for short tokens', () => {
      expect(TeamInviteTokenVO.create('A'.repeat(16)).isSecure()).toBe(false);
    });
  });

  describe('masked()', () => {
    it('shows first 4 chars and masks rest', () => {
      const masked = TeamInviteTokenVO.create('ABCDEF1234567890').masked();
      expect(masked.startsWith('ABCD')).toBe(true);
      expect(masked).toContain('*');
    });
  });
});
