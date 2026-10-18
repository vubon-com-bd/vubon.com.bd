/**
 * UserHttpValidator tests
 */
import { describe, it, expect } from '@jest/globals';
import { BadRequestException } from '@nestjs/common';
import { UserHttpValidator } from '@interfaces/validators/user.validator.js';

describe('UserHttpValidator', () => {
  describe('validateCreate()', () => {
    it('should pass valid create', () => {
      expect(() => UserHttpValidator.validateCreate({
        email: 'new@vubon.com.bd',
        password: 'StrongP@ss123',
        type: 'individual',
        acceptTerms: true,
      })).not.toThrow();
    });
    it('should reject invalid email', () => {
      expect(() => UserHttpValidator.validateCreate({
        email: 'bad-email',
        password: 'StrongP@ss123',
        type: 'individual',
        acceptTerms: true,
      })).toThrow(BadRequestException);
    });
    it('should reject weak password', () => {
      expect(() => UserHttpValidator.validateCreate({
        email: 'new@vubon.com.bd',
        password: 'short',
        type: 'individual',
        acceptTerms: true,
      })).toThrow(BadRequestException);
    });
    it('should reject false acceptTerms', () => {
      expect(() => UserHttpValidator.validateCreate({
        email: 'new@vubon.com.bd',
        password: 'StrongP@ss123',
        type: 'individual',
        acceptTerms: false,
      })).toThrow(BadRequestException);
    });
  });

  describe('validateUpdate()', () => {
    it('should be a function', () => {
      expect(typeof UserHttpValidator.validateUpdate).toBe('function');
    });
    it('should reject invalid username', () => {
      expect(() => UserHttpValidator.validateUpdate({ username: 'a' })).toThrow(BadRequestException);
    });
  });

  describe('validateProfile()', () => {
    it('should pass valid profile', () => {
      expect(() => UserHttpValidator.validateProfile({ firstName: 'John', lastName: 'Doe' })).not.toThrow();
    });
    it('should reject invalid avatar URL', () => {
      expect(() => UserHttpValidator.validateProfile({ avatarUrl: 'not-a-url' })).toThrow(BadRequestException);
    });
  });

  describe('validateSettings()', () => {
    it('should pass valid settings', () => {
      expect(() => UserHttpValidator.validateSettings({ theme: 'dark', language: 'en' })).not.toThrow();
    });
    it('should reject invalid theme', () => {
      expect(() => UserHttpValidator.validateSettings({ theme: 'neon' })).toThrow(BadRequestException);
    });
  });

  describe('validatePreferences()', () => {
    it('should pass valid preferences — only schema fields', () => {
      expect(() => UserHttpValidator.validatePreferences({
        newsletter: true,
        promotions: false,
        orderUpdates: true,
        productRecommendations: true,
        securityAlerts: true,
      })).not.toThrow();
    });
    it('should reject unknown fields (strict schema)', () => {
      expect(() => UserHttpValidator.validatePreferences({
        emailNotifications: true, // NOT in schema
      })).toThrow(BadRequestException);
    });
  });

  describe('validateAddAddress()', () => {
    it('should be a function', () => {
      expect(typeof UserHttpValidator.validateAddAddress).toBe('function');
    });
    it('should reject missing required fields', () => {
      expect(() => UserHttpValidator.validateAddAddress({})).toThrow(BadRequestException);
    });
  });

  describe('validateUpdateAddress()', () => {
    it('should pass valid partial update', () => {
      expect(() => UserHttpValidator.validateUpdateAddress({ city: 'Chittagong' })).not.toThrow();
    });
  });

  describe('validateAddContact()', () => {
    it('should be a function', () => {
      expect(typeof UserHttpValidator.validateAddContact).toBe('function');
    });
    it('should reject empty object', () => {
      expect(() => UserHttpValidator.validateAddContact({})).toThrow(BadRequestException);
    });
  });

  describe('validateSubmitKyc()', () => {
    it('should reject empty documents', () => {
      expect(() => UserHttpValidator.validateSubmitKyc({ documents: [] })).toThrow(BadRequestException);
    });
    it('should be a function', () => {
      expect(typeof UserHttpValidator.validateSubmitKyc).toBe('function');
    });
  });
});
