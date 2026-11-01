/**
 * Coverage gap-fill — Mappers, Validators, Errors
 * @module identity-service/test/unit/application
 */
import { describe, it, expect } from '@jest/globals';

import { UserMapper } from '@application/mappers/user.mapper.js';
import { AuthSessionMapper } from '@application/mappers/auth-session.mapper.js';
import { AuthTokenMapper } from '@application/mappers/auth-token.mapper.js';
import { AuthMfaMapper } from '@application/mappers/auth-mfa.mapper.js';
import { AuthDeviceMapper } from '@application/mappers/auth-device.mapper.js';

import { AuthValidator } from '@application/validators/auth.validator.js';
import { UserValidator } from '@application/validators/user.validator.js';
import { MfaValidator } from '@application/validators/mfa.validator.js';

import { LoginFailedError, RegistrationFailedError } from '@application/errors/auth.errors.js';
import { UserNotFoundError, UserOperationFailedError } from '@application/errors/user.errors.js';
import { SessionOperationFailedError } from '@application/errors/session.errors.js';
import { TokenOperationFailedError } from '@application/errors/token.errors.js';
import { MfaOperationFailedError } from '@application/errors/mfa.errors.js';
import { SocialOperationFailedError } from '@application/errors/social.errors.js';
import { SsoOperationFailedError } from '@application/errors/sso.errors.js';
import { BiometricOperationFailedError } from '@application/errors/biometric.errors.js';
import { PermissionDeniedError } from '@application/errors/permission.errors.js';

import {
  activeUser, activeSession, makeTokenEntity, makeMfaEntity, makeDeviceEntity,
  TEST_PASSWORD_PLAIN,
} from '@fixtures/index.js';

describe('Application Gap-Fill — Mappers/Validators/Errors', () => {
  describe('Mappers extra', () => {
    it('UserMapper.toDTOList() multiple', () => {
      const list = UserMapper.toDTOList([activeUser(), activeUser()]);
      expect(list.length).toBe(2);
    });
    it('AuthSessionMapper.toDTO() fields', () => {
      const s = activeSession();
      const dto = AuthSessionMapper.toDTO(s);
      expect(dto.userId).toBe(s.userId.value);
    });
    it('AuthSessionMapper.toDTOList() empty', () => {
      expect(AuthSessionMapper.toDTOList([])).toEqual([]);
    });
    it('AuthTokenMapper.toDTOList() multiple', () => {
      const list = AuthTokenMapper.toDTOList([makeTokenEntity(), makeTokenEntity()]);
      expect(list.length).toBe(2);
    });
    it('AuthMfaMapper.toDTO() success true', () => {
      const dto = AuthMfaMapper.toDTO(makeMfaEntity());
      expect(dto.success).toBe(true);
    });
    it('AuthDeviceMapper.toDTOList() multiple', () => {
      const list = AuthDeviceMapper.toDTOList([makeDeviceEntity(), makeDeviceEntity()]);
      expect(list.length).toBe(2);
    });
  });

  describe('Validators extra branches', () => {
    it('AuthValidator.validateResetPassword() valid', () => {
      const r = AuthValidator.validateResetPassword({
        token: 'reset-token-abcdefghij',
        newPassword: TEST_PASSWORD_PLAIN,
        confirmPassword: TEST_PASSWORD_PLAIN,
      });
      expect(r.token).toBeDefined();
    });
    it('AuthValidator.validateLoginSafe() error path', () => {
      const r = AuthValidator.validateLoginSafe({ identifier: '' });
      expect(r.success).toBe(false);
    });
    it('UserValidator.validateCreateSafe() error path', () => {
      expect(UserValidator.validateCreateSafe({}).success).toBe(false);
    });
    it('UserValidator.validateUpdate() valid username', () => {
      // Username must be 3-30 chars per schema
      expect(UserValidator.validateUpdate({ username: 'validuser123' })).toBeDefined();
    });
    it('MfaValidator.validateVerify() valid', () => {
      const r = MfaValidator.validateVerify({
        challengeId: '11111111-1111-4111-8111-111111111111',
        code: '123456', method: 'totp',
      });
      expect(r.code).toBe('123456');
    });
    it('MfaValidator.validateEnable() valid', () => {
      const r = MfaValidator.validateEnable({ method: 'totp', code: '123456' });
      expect(r.method).toBe('totp');
    });
  });

  describe('Errors toJSON + context', () => {
    it('LoginFailedError.toJSON()', () => {
      const e = new LoginFailedError('x');
      expect(e.toJSON()).toHaveProperty('code');
      expect(e.toJSON()).toHaveProperty('httpStatus');
    });
    it('RegistrationFailedError context includes reason', () => {
      const e = new RegistrationFailedError('r');
      expect(e.context?.reason).toBe('r');
    });
    it('UserNotFoundError toJSON', () => {
      const e = new UserNotFoundError('u');
      expect(e.toJSON()).toHaveProperty('message');
    });
    it('UserOperationFailedError context', () => {
      const e = new UserOperationFailedError('op', 'r');
      expect(e.context?.operation).toBe('op');
    });
    it('SessionOperationFailedError toJSON', () => {
      expect(new SessionOperationFailedError('op', 'r').toJSON()).toHaveProperty('name');
    });
    it('TokenOperationFailedError toJSON', () => {
      expect(new TokenOperationFailedError('op', 'r').toJSON()).toHaveProperty('code');
    });
    it('MfaOperationFailedError toJSON', () => {
      expect(new MfaOperationFailedError('op', 'r').toJSON()).toHaveProperty('name');
    });
    it('SocialOperationFailedError context', () => {
      const e = new SocialOperationFailedError('google', 'r');
      expect(e.context?.provider).toBe('google');
    });
    it('SsoOperationFailedError context', () => {
      const e = new SsoOperationFailedError('saml', 'r');
      expect(e.context?.provider).toBe('saml');
    });
    it('BiometricOperationFailedError context', () => {
      const e = new BiometricOperationFailedError('verify', 'r');
      expect(e.context?.operation).toBe('verify');
    });
    it('PermissionDeniedError toJSON', () => {
      expect(new PermissionDeniedError('x', 'u').toJSON()).toHaveProperty('httpStatus');
    });
  });
});
