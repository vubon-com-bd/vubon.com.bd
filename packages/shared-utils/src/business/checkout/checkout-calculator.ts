/**
 * Checkout Calculator
 * চেকআউট ক্যালকুলেটর
 */

import type { Checkout } from '@vubon/shared-types';
import type { Cart } from '@vubon/shared-types';

export interface CheckoutCalculationResult {
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  savings: number;
  itemCount: number;
}

export interface ShippingCalculation {
  method: string;
  cost: number;
  estimatedDays: number;
  isAvailable: true;
}

export interface TaxCalculation {
  rate: number;
  amount: number;
  type: 'inclusive' | 'exclusive';
  country: string;
  state?: string;
}

export const calculateCheckoutTotal = (checkout: Checkout): CheckoutCalculationResult => {
  const subtotal = checkout.subtotal || 0;
  const discount = checkout.discount || 0;
  const tax = checkout.tax || 0;
  const shipping = checkout.shipping || 0;
  const total = subtotal - discount + tax + shipping;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discount: Math.round(discount * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    shipping: Math.round(shipping * 100) / 100,
    total: Math.round(total * 100) / 100,
    currency: checkout.currency || 'BDT',
    savings: Math.round(discount * 100) / 100,
    itemCount: checkout.cart?.items?.length || 0,
  };
};

export const calculateShippingCost = (
  items: Cart['items'],
  method: string,
  address: {
    division: string;
    district: string;
    upazila?: string;
  }
): ShippingCalculation => {
  // Base shipping costs by division (Bangladesh)
  const baseCosts: Record<string, number> = {
    dhaka: 60,
    chittagong: 80,
    rajshahi: 100,
    khulna: 100,
    barisal: 120,
    sylhet: 120,
    rangpur: 140,
    mymensingh: 100,
  };

  const baseRate = baseCosts[address.division.toLowerCase()] || 100;
  const weight = items.reduce(
    (sum, item) => sum + (item.product?.weight || 0.5) * item.quantity,
    0
  );
  const weightCharge = Math.ceil(weight) * 20;

  const costs = {
    standard: baseRate + weightCharge,
    express: baseRate + weightCharge + 50,
    same_day: baseRate + weightCharge + 100,
    next_day: baseRate + weightCharge + 80,
  };

  const cost = costs[method as keyof typeof costs] || costs.standard;
  const estimatedDays =
    method === 'same_day' ? 1 : method === 'express' ? 2 : method === 'next_day' ? 1 : 3;

  return {
    method,
    cost: Math.round(cost * 100) / 100,
    estimatedDays,
    isAvailable: true,
  };
};

export const calculateCheckoutTax = (
  amount: number,
  country: string,
  state?: string,
  isInclusive: boolean = false
): TaxCalculation => {
  // Tax rates by country (Bangladesh specific)
  const taxRates: Record<string, number> = {
    BD: 15,
    US: 7.5,
    UK: 20,
    IN: 18,
    AE: 5,
    SG: 7,
    MY: 6,
  };

  const rate = taxRates[country] || 0;
  const taxAmount = (amount * rate) / 100;

  return {
    rate,
    amount: Math.round(taxAmount * 100) / 100,
    type: isInclusive ? 'inclusive' : 'exclusive',
    country,
    state,
  };
};

export const calculateCheckoutSummary = (
  cart: Cart,
  shippingMethod: string,
  address: {
    division: string;
    district: string;
    upazila?: string;
  },
  country: string = 'BD',
  taxRate: number = 15
): CheckoutCalculationResult => {
  const subtotal = cart.subtotal || 0;
  const discount = cart.discount || 0;

  // Calculate shipping
  const shipping = calculateShippingCost(cart.items, shippingMethod, address);

  // Calculate tax using country and taxRate
  const taxRates: Record<string, number> = {
    BD: 15,
    US: 7.5,
    UK: 20,
    IN: 18,
    AE: 5,
    SG: 7,
    MY: 6,
  };
  const effectiveTaxRate = taxRates[country] || taxRate;
  const taxAmount = ((subtotal - discount) * effectiveTaxRate) / 100;

  const total = subtotal - discount + taxAmount + shipping.cost;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discount: Math.round(discount * 100) / 100,
    tax: Math.round(taxAmount * 100) / 100,
    shipping: Math.round(shipping.cost * 100) / 100,
    total: Math.round(total * 100) / 100,
    currency: cart.currency || 'BDT',
    savings: Math.round(discount * 100) / 100,
    itemCount: cart.items.length,
  };
};
