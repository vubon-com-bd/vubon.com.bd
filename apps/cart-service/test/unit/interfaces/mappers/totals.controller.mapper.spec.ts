/**
 * TotalsControllerMapper — Unit Tests
 * @module test/unit/interfaces/mappers
 */
import { describe, it, expect } from '@jest/globals';
import { TotalsControllerMapper } from '../../../../src/module/interfaces/mappers/totals.controller.mapper.js';
import { CART_ID } from '../../../fixtures/interfaces/http-dto.fixture.js';

describe('TotalsControllerMapper', () => {
  describe('toSetShippingAppDto', () => {
    it('should map shipping request', () => {
      const app = TotalsControllerMapper.toSetShippingAppDto(CART_ID, {
        method: 'express',
        cost: 150,
        estimatedDays: 2,
      } as never);
      expect(app.cartId).toBe(CART_ID);
      expect(app.method).toBe('express');
      expect(app.cost).toBe(150);
    });
  });

  describe('toTotalsHttp', () => {
    it('should map totals', () => {
      const app = {
        subtotal: 100,
        discount: 10,
        taxableBase: 90,
        tax: 13.5,
        shipping: 60,
        total: 163.5,
        currency: 'BDT',
        itemCount: 3,
      };
      const http = TotalsControllerMapper.toTotalsHttp(app as never);
      expect(http.total).toBe(163.5);
      expect(http.itemCount).toBe(3);
    });
  });

  describe('toShippingCalculationHttp', () => {
    it('should map calculation result', () => {
      const app = {
        cartId: CART_ID,
        method: 'standard',
        cost: 60,
        currency: 'BDT',
        isFree: false,
        estimatedDays: 5,
      };
      const http = TotalsControllerMapper.toShippingCalculationHttp(app as never);
      expect(http.cost).toBe(60);
      expect(http.isFree).toBe(false);
    });

    it('should default estimatedDays to 0 when missing', () => {
      const app = {
        cartId: CART_ID,
        method: 'pickup',
        cost: 0,
        currency: 'BDT',
        isFree: true,
      };
      const http = TotalsControllerMapper.toShippingCalculationHttp(app as never);
      expect(http.estimatedDays).toBe(0);
    });
  });
});
