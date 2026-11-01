/**
 * CartCalculationService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CartCalculationService } from '@domain/services/cart-calculation.service.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { makeCartItem } from '../../../fixtures/index';

describe('CartCalculationService', () => {
  it('calculates basic totals', () => {
    const items = [makeCartItem({ quantity: 2, unitPrice: 100 })];
    const result = CartCalculationService.calculate({
      items,
      discountAmount: 0,
      taxRate: 0,
      shippingCost: 0,
    });

    expect(result.subtotal).toBe(200);
    expect(result.total).toBe(200);
    expect(result.itemCount).toBe(1);
  });

  it('applies discount', () => {
    const items = [makeCartItem({ quantity: 2, unitPrice: 100 })];
    const result = CartCalculationService.calculate({
      items,
      discountAmount: 40,
      taxRate: 0,
      shippingCost: 0,
    });

    expect(result.discount).toBe(40);
    expect(result.total).toBe(160);
  });

  it('applies exclusive tax on taxable base', () => {
    const items = [makeCartItem({ quantity: 1, unitPrice: 100 })];
    const result = CartCalculationService.calculate({
      items,
      discountAmount: 0,
      taxRate: 15,
      shippingCost: 0,
    });

    expect(result.tax).toBe(15);
    expect(result.total).toBe(115);
  });

  it('applies inclusive tax', () => {
    const items = [makeCartItem({ quantity: 1, unitPrice: 115 })];
    const result = CartCalculationService.calculate({
      items,
      discountAmount: 0,
      taxRate: 15,
      shippingCost: 0,
      taxInclusive: true,
    });

    expect(result.total).toBe(115);
    expect(result.tax).toBeGreaterThan(0);
  });

  it('applies shipping', () => {
    const items = [makeCartItem({ quantity: 1, unitPrice: 100 })];
    const result = CartCalculationService.calculate({
      items,
      discountAmount: 0,
      taxRate: 0,
      shippingCost: 50,
    });

    expect(result.shipping).toBe(50);
    expect(result.total).toBe(150);
  });

  it('free shipping above threshold', () => {
    const items = [makeCartItem({ quantity: 1, unitPrice: 500 })];
    const result = CartCalculationService.calculate({
      items,
      discountAmount: 0,
      taxRate: 0,
      shippingCost: 50,
      freeShippingAbove: 300,
    });

    expect(result.shipping).toBe(0);
    expect(result.total).toBe(500);
  });

  it('clamps discount to subtotal', () => {
    const items = [makeCartItem({ quantity: 1, unitPrice: 100 })];
    const result = CartCalculationService.calculate({
      items,
      discountAmount: 500,
      taxRate: 0,
      shippingCost: 0,
    });

    expect(result.discount).toBe(100);
  });

  it('throws on invalid tax rate', () => {
    const items = [makeCartItem({ quantity: 1, unitPrice: 100 })];
    expect(() =>
      CartCalculationService.calculate({
        items,
        discountAmount: 0,
        taxRate: 150,
        shippingCost: 0,
      }),
    ).toThrow(ValidationError);
  });

  it('throws on negative shipping', () => {
    const items = [makeCartItem({ quantity: 1, unitPrice: 100 })];
    expect(() =>
      CartCalculationService.calculate({
        items,
        discountAmount: 0,
        taxRate: 0,
        shippingCost: -5,
      }),
    ).toThrow(ValidationError);
  });

  it('handles empty item list', () => {
    const result = CartCalculationService.calculate({
      items: [],
      discountAmount: 0,
      taxRate: 0,
      shippingCost: 0,
    });

    expect(result.subtotal).toBe(0);
    expect(result.total).toBe(0);
  });
});
