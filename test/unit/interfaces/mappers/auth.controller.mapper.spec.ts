/**
 * AuthControllerMapper tests
 */
import { describe, it, expect } from '@jest/globals';
import { AuthControllerMapper } from '@interfaces/mappers/auth.controller.mapper.js';
import {
  makeLoginDto,
  makeRegisterDto,
  makeEnableMfaDto,
  makeVerifyMfaDto,
} from '@fixtures/interfaces/index.js';

describe('AuthControllerMapper', () => {
  describe('toLoginAppDto()', () => {
    it('should map basic fields', () => {
      const r = AuthControllerMapper.toLoginAppDto(makeLoginDto());
      expect(r.identifier).toBe('test.user@vubon.com.bd');
      expect(r.password).toBe('StrongP@ss123');
      expect(r.rememberMe).toBe(false);
    });

    it('should pass through rememberMe=true', () => {
      const r = AuthControllerMapper.toLoginAppDto(makeLoginDto({ rememberMe: true }));
      expect(r.rememberMe).toBe(true);
    });

    it('should pass deviceId', () => {
      const r = AuthControllerMapper.toLoginAppDto(
        makeLoginDto({ deviceId: 'fp-xyz' }),
      );
      expect(r.deviceId).toBe('fp-xyz');
    });

    it('should default rememberMe to false when missing', () => {
      const r = AuthControllerMapper.toLoginAppDto({
        identifier: 'x@vubon.com.bd',
        password: 'StrongP@ss123',
      });
      expect(r.rememberMe).toBe(false);
    });
  });

  describe('toRegisterAppDto()', () => {
    it('should map all fields', () => {
      const r = AuthControllerMapper.toRegisterAppDto(makeRegisterDto());
      expect(r.email).toBe('new.user@vubon.com.bd');
      expect(r.password).toBe('StrongP@ss123');
      expect(r.confirmPassword).toBe('StrongP@ss123');
      expect(r.acceptTerms).toBe(true);
      expect(r.acceptMarketing).toBe(false);
    });

    it('should pass through optional fields', () => {
      const r = AuthControllerMapper.toRegisterAppDto(
        makeRegisterDto({ firstName: 'John', lastName: 'Doe' }),
      );
      expect(r.firstName).toBe('John');
      expect(r.lastName).toBe('Doe');
    });
  });

  describe('toRefreshAppDto()', () => {
    it('should map refreshToken', () => {
      const r = AuthControllerMapper.toRefreshAppDto({ refreshToken: 'tok-abc' });
      expect(r.refreshToken).toBe('tok-abc');
    });
  });

  describe('toLogoutAppDto()', () => {
    it('should map all logout fields', () => {
      const r = AuthControllerMapper.toLogoutAppDto({
        sessionId: '11111111-1111-4111-8111-111111111111',
        allDevices: true,
        refreshToken: 'tok-xyz',
      });
      expect(r.sessionId).toBe('11111111-1111-4111-8111-111111111111');
      expect(r.allDevices).toBe(true);
      expect(r.refreshToken).toBe('tok-xyz');
    });

    it('should default allDevices to false', () => {
      const r = AuthControllerMapper.toLogoutAppDto({});
      expect(r.allDevices).toBe(false);
    });
  });

  describe('toForgotPasswordAppDto()', () => {
    it('should map identifier + channel', () => {
      const r = AuthControllerMapper.toForgotPasswordAppDto({
        identifier: 'user@vubon.com.bd',
        channel: 'sms',
      });
      expect(r.identifier).toBe('user@vubon.com.bd');
      expect(r.channel).toBe('sms');
    });

    it('should default channel to email', () => {
      const r = AuthControllerMapper.toForgotPasswordAppDto({
        identifier: 'user@vubon.com.bd',
      });
      expect(r.channel).toBe('email');
    });
  });

  describe('toResetPasswordAppDto()', () => {
    it('should map reset fields', () => {
      const r = AuthControllerMapper.toResetPasswordAppDto({
        token: 'abc',
        newPassword: 'NewStrongP@ss123',
        confirmPassword: 'NewStrongP@ss123',
      });
      expect(r.token).toBe('abc');
      expect(r.newPassword).toBe('NewStrongP@ss123');
    });
  });

  describe('toVerifyEmailAppDto()', () => {
    it('should map verify fields', () => {
      const r = AuthControllerMapper.toVerifyEmailAppDto({
        email: 'user@vubon.com.bd',
        token: 'abc',
      });
      expect(r.email).toBe('user@vubon.com.bd');
      expect(r.token).toBe('abc');
    });
  });

  describe('toEnableMfaAppDto()', () => {
    it('should map enable fields', () => {
      const r = AuthControllerMapper.toEnableAppDto(makeEnableMfaDto());
      expect(r.method).toBe('totp');
      expect(r.code).toBe('123456');
    });
  });

  describe('toVerifyMfaAppDto()', () => {
    it('should map verify fields', () => {
      const r = AuthControllerMapper.toVerifyAppDto(makeVerifyMfaDto());
      expect(r).toMatchObject({
        challengeId: '11111111-1111-4111-8111-111111111111',
        code: '123456',
        method: 'totp',
      });
    });
  });

  describe('toSetupMfaAppDto()', () => {
    it('should map setup method', () => {
      const r = AuthControllerMapper.toSetupAppDto({ method: 'totp' });
      expect(r.method).toBe('totp');
    });
  });
});
