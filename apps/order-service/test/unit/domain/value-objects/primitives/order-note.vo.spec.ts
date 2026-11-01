/**
 * OrderNoteVO — Full coverage
 */
import { describe, it, expect } from '@jest/globals';
import { OrderNoteVO } from '@domain/primitives/order-note.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('OrderNoteVO', () => {
  describe('create', () => {
    it('creates with text', () => {
      expect(OrderNoteVO.create('hello').value).toBe('hello');
    });
    it('trims whitespace', () => {
      expect(OrderNoteVO.create('  hello  ').value).toBe('hello');
    });
    it('accepts empty string', () => {
      expect(OrderNoteVO.create('').isEmpty()).toBe(true);
    });
    it('accepts max length (1000)', () => {
      expect(OrderNoteVO.create('a'.repeat(1000)).value.length).toBe(1000);
    });
    it('throws for length > 1000', () => {
      expect(() => OrderNoteVO.create('a'.repeat(1001))).toThrow(ValidationError);
    });
    it('throws for non-string', () => {
      expect(() => OrderNoteVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('empty factory', () => {
    it('creates empty note', () => {
      expect(OrderNoteVO.empty().isEmpty()).toBe(true);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      expect(OrderNoteVO.reconstitute('any').value).toBe('any');
    });
  });

  describe('isEmpty', () => {
    it('true for empty', () => {
      expect(OrderNoteVO.empty().isEmpty()).toBe(true);
    });
    it('false for non-empty', () => {
      expect(OrderNoteVO.create('hi').isEmpty()).toBe(false);
    });
  });

  describe('base methods', () => {
    it('toString', () => {
      expect(OrderNoteVO.create('hello').toString()).toBe('hello');
    });
    it('toJSON', () => {
      expect(OrderNoteVO.create('hello').toJSON()).toBe('hello');
    });
    it('equals', () => {
      expect(OrderNoteVO.create('hi').equals(OrderNoteVO.create('hi'))).toBe(true);
    });
  });
});
