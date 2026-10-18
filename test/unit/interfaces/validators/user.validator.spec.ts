/**
 * UserHttpValidator tests
 */
import { describe, it, expect } from '@jest/globals';
import { BadRequestException } from '@nestjs/common';
import { UserHttpValidator } from '@interfaces/validators/user.validator.js';
import { makeCreateUserDto, makeSubmitKycDto } from '@fixtures/interfaces/index.js';

describe('UserHttpValidator', () => {
  describe('validateCreate()', () => {
    it('should pass valid create', () => {
      expect(() => UserHttpValidator.validateCreate(makeCreateUserDto())).not.toThrow();
    });

    it('should reject invalid email', () => {
      expect(() =>
        UserHttpValidator.validateCreate(makeCreateUserDto({ email: 'bad-email' })),
      ).toThrow(BadRequestException);
    });

    it('should reject weak password', () => {
      expect(() =>
        UserHttpValidator.validateCreate(makeCreateUserDto({ password: 'short' })),
      ).toThrow(BadRequestException);
    });

    it('should reject false acceptTerms', () => {
      expect(() =>
        UserHttpValidator.validateCreate(makeCreateUserDto({ acceptTerms: false })),
      ).toThrow(BadRequestException);
    });
  });

  describe('validateUpdate()', () => {
    it('should pass empty update', () => {
      expect(() => UserHttpValidator.validateUpdate({})).not.toThrow();
    });

    it('should pass valid partial update', () => {
      expect(() =>
        UserHttpValidator.validateUpdate({ firstName: 'John' }),
      ).not.toThrow();
    });
  });

  describe('validateProfile()', () => {
    it('should pass valid profile', () => {
      expect(() =>
        UserHttpValidator.validateProfile({ firstName: 'John', lastName: 'Doe' }),
      ).not.toThrow();
    });

    it('should reject invalid avatar URL', () => {
      expect(() =>
        UserHttpValidator.validateProfile({ avatarUrl: 'not-a-url' }),
      ).toThrow(BadRequestException);
    });
  });

  describe('validateSettings()', () => {
    it('should pass valid settings', () => {
      expect(() =>
        UserHttpValidator.validateSettings({ theme: 'dark', language: 'en' }),
      ).not.toThrow();
    });

    it('should reject invalid theme', () => {
      expect(() =>
        UserHttpValidator.validateSettings({ theme: 'neon' }),
      ).toThrow(BadRequestException);
    });
  });

  describe('validatePreferences()', () => {
    it('should pass valid preferences', () => {
      expect(() =>
        UserHttpValidator.validatePreferences({ emailNotifications: true }),
      ).not.toThrow();
    });
  });

  describe('validateAddAddress()', () => {
    it('should pass valid address', () => {
      expect(() =>
        UserHttpValidator.validateAddAddress({
          type: 'home',
          fullName: 'John Doe',
          phone: '+8801712345678',
          addressLine1: 'House 12, Road 5',
          city: 'Dhaka',
          state: 'Dhaka',
          division: 'Dhaka',
          district: 'Dhaka',
          postalCode: '1205',
          country: 'BD',
        }),
      ).not.toThrow();
    });

    it('should reject invalid postal code', () => {
      expect(() =>
        UserHttpValidator.validateAddAddress({
          type: 'home',
          fullName: 'John Doe',
          phone: '+8801712345678',
          addressLine1: 'House 12',
          city: 'Dhaka',
          state: 'Dhaka',
          division: 'Dhaka',
          district: 'Dhaka',
          postalCode: 'ABCDE',
          country: 'BD',
        }),
      ).toThrow(BadRequestException);
    });
  });

  describe('validateUpdateAddress()', () => {
    it('should pass valid partial update', () => {
      expect(() =>
        UserHttpValidator.validateUpdateAddress({ city: 'Chittagong' }),
      ).not.toThrow();
    });
  });

  describe('validateAddContact()', () => {
    it('should pass valid contact', () => {
      expect(() =>
        UserHttpValidator.validateAddContact({
          type: 'email',
          value: 'secondary@vubon.com.bd',
        }),
      ).not.toThrow();
    });
  });

  describe('validateSubmitKyc()', () => {
    it('should pass valid KYC', () => {
      expect(() =>
        UserHttpValidator.validateSubmitKyc(makeSubmitKycDto()),
      ).not.toThrow();
    });

    it('should reject empty documents', () => {
      expect(() =>
        UserHttpValidator.validateSubmitKyc({ documents: [] }),
      ).toThrow(BadRequestException);
    });
  });
});
