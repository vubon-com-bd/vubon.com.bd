/**
 * CartItemNoteVO extended tests
 */
import { describe, it, expect } from '@jest/globals';
import { CartItemNoteVO } from '@domain/value-objects/primitives/cart-item-note.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CartItemNoteVO — extended', () => {
  it('create() accepts valid note', () => {
    const vo = CartItemNoteVO.create('Gift wrap');
    expect(vo.value).toBe('Gift wrap');
    expect(vo.isEmpty()).toBe(false);
    expect(vo.length).toBe(9);
  });

  it('empty() factory', () => {
    expect(CartItemNoteVO.empty().isEmpty()).toBe(true);
  });

  it('trims whitespace', () => {
    expect(CartItemNoteVO.create('  hi  ').value).toBe('hi');
  });

  it('throws on too long', () => {
    expect(() => CartItemNoteVO.create('x'.repeat(501))).toThrow(ValidationError);
  });

  it('throws on non-string', () => {
    expect(() => CartItemNoteVO.create(123 as never)).toThrow(ValidationError);
  });

  it('reconstitute()', () => {
    expect(CartItemNoteVO.reconstitute('any').value).toBe('any');
  });
});
