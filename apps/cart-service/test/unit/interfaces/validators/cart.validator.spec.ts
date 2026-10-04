import { jest } from '@jest/globals';

import { CartValidator, CreateCartHttpSchema, UpdateCartHttpSchema } from '../../../../src/module/interfaces/validators/cart.validator.js';

describe('CartValidator (interfaces)', () => {
  describe('validateCreate()', () => {
    it('accepts valid input', () => {
      expect(() => CartValidator.validateCreate({ type: 'user', currency: 'BDT' })).not.toThrow();
    });

    it('accepts empty input', () => {
      expect(() => CartValidator.validateCreate({})).not.toThrow();
    });

    it('throws on invalid type', () => {
      expect(() => CartValidator.validateCreate({ type: 'invalid' })).toThrow();
    });

    it('throws on invalid currency length', () => {
      expect(() => CartValidator.validateCreate({ currency: 'BD' })).toThrow();
    });

    it('throws on unknown field (strict)', () => {
      expect(() => CartValidator.validateCreate({ unknownField: 'x' })).toThrow();
    });
  });

  describe('validateUpdate()', () => {
    it('accepts valid update', () => {
      expect(() => CartValidator.validateUpdate({ notes: 'note' })).not.toThrow();
    });

    it('throws on invalid currency', () => {
      expect(() => CartValidator.validateUpdate({ currency: 'X' })).toThrow();
    });
  });

  describe('schemas', () => {
    it('CreateCartHttpSchema exports', () => {
      expect(CreateCartHttpSchema).toBeDefined();
    });
    it('UpdateCartHttpSchema exports', () => {
      expect(UpdateCartHttpSchema).toBeDefined();
    });
  });
});
