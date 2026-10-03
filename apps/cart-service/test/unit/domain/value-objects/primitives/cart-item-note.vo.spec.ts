/**
 * CartItemNoteVO — Unit Tests
 */
import { CartItemNoteVO } from '../../../../../src/module/domain/value-objects/primitives/cart-item-note.vo.js';

describe('CartItemNoteVO', () => {
  describe('create()', () => {
    it('creates VO from a normal string', () => {
      const vo = CartItemNoteVO.create('Please gift-wrap this');
      expect(vo.value).toBe('Please gift-wrap this');
    });

    it('trims surrounding whitespace', () => {
      const vo = CartItemNoteVO.create('   hello   ');
      expect(vo.value).toBe('hello');
    });

    it('throws on empty string', () => {
      expect(() => CartItemNoteVO.create('')).toThrow();
    });

    it('throws on whitespace-only', () => {
      expect(() => CartItemNoteVO.create('   ')).toThrow();
    });

    it('throws on non-string input', () => {
      expect(() => CartItemNoteVO.create(123 as never)).toThrow();
    });

    it('throws when exceeding max length (500)', () => {
      const long = 'a'.repeat(501);
      expect(() => CartItemNoteVO.create(long)).toThrow();
    });

    it('accepts exactly 500 characters', () => {
      const exact = 'a'.repeat(500);
      const vo = CartItemNoteVO.create(exact);
      expect(vo.value).toBe(exact);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = CartItemNoteVO.reconstitute('');
      expect(vo.value).toBe('');
    });
  });

  describe('isEmpty()', () => {
    it('false for non-empty note', () => {
      expect(CartItemNoteVO.create('hello').isEmpty()).toBe(false);
    });

    it('true for empty reconstituted note', () => {
      expect(CartItemNoteVO.reconstitute('').isEmpty()).toBe(true);
    });
  });

  describe('length getter', () => {
    it('returns string length', () => {
      expect(CartItemNoteVO.create('hello').length).toBe(5);
    });
  });
});
