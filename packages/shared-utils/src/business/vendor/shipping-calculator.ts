/**
 * Vendor Shipping Calculator
 * ভেন্ডর শিপিং ক্যালকুলেটর
 */

import { VENDOR_SHIPPING } from '@vubon/shared-constants';
import type { VendorShipping } from '@vubon/shared-types';

export interface VendorShippingCalculation {
  type: string;
  cost: number;
  estimatedDays: number;
  freeShipping: boolean;
  freeShippingThreshold: number;
  carrier: string;
  zone?: string;
}

export const calculateVendorShipping = (
  shipping: VendorShipping,
  weight: number,
  distance: number
): VendorShippingCalculation => {
  const cost = shipping.cost || 0;
  const estimatedDays = shipping.estimatedDays || 3;
  const freeShippingThreshold = shipping.freeShippingThreshold || 0;

  let finalCost = cost;
  let freeShipping = false;

  // VENDOR_SHIPPING ডিফল্ট ব্যবহার - হার্ডকোডেড মান
  const weightChargeRate = 10; // 10 BDT per kg
  const distanceChargeRate = 0.5; // 0.5 BDT per km

  if (weight > 0) {
    finalCost += weight * weightChargeRate;
  }

  if (distance > 0) {
    finalCost += distance * distanceChargeRate;
  }

  // VENDOR_SHIPPING থেকে জোন চেক
  const validZones = Object.values(VENDOR_SHIPPING.ZONES) as string[];
  const shippingZones = shipping.zones?.filter((z) => validZones.includes(z)) || [];

  if (freeShippingThreshold > 0) {
    freeShipping = true;
    finalCost = 0;
  }

  return {
    type: shipping.type,
    cost: Math.round(finalCost * 100) / 100,
    estimatedDays,
    freeShipping,
    freeShippingThreshold,
    carrier: shipping.carrier,
    zone: shippingZones.length > 0 ? shippingZones[0] : undefined,
  };
};

export const calculateVendorShippingByZone = (
  shipping: VendorShipping,
  zone: string,
  weight: number
): {
  cost: number;
  estimatedDays: number;
} => {
  const baseCost = shipping.cost || 0;
  const estimatedDays = shipping.estimatedDays || 3;

  // VENDOR_SHIPPING জোন মাল্টিপ্লায়ার ব্যবহার
  const zoneMultipliers: Record<string, number> = {
    dhaka: 1.0,
    chittagong: 1.2,
    rajshahi: 1.3,
    khulna: 1.3,
    barisal: 1.4,
    sylhet: 1.4,
    rangpur: 1.5,
    mymensingh: 1.3,
    international: 3.0,
  };

  const multiplier = zoneMultipliers[zone.toLowerCase()] || 1.0;
  const weightChargeRate = 10; // 10 BDT per kg
  const weightCharge = weight > 0 ? weight * weightChargeRate : 0;
  const cost = baseCost * multiplier + weightCharge;

  return {
    cost: Math.round(cost * 100) / 100,
    estimatedDays: Math.round(estimatedDays * multiplier),
  };
};

export const calculateVendorShippingCost = (
  shipping: VendorShipping,
  items: { weight: number; quantity: number }[]
): number => {
  const totalWeight = items.reduce((sum, item) => sum + item.weight * item.quantity, 0);
  const baseCost = shipping.cost || 0;
  const weightChargeRate = 10; // 10 BDT per kg
  const weightCharge = totalWeight > 0 ? totalWeight * weightChargeRate : 0;
  return Math.round((baseCost + weightCharge) * 100) / 100;
};

// VENDOR_SHIPPING থেকে হেল্পার ফাংশন
export const getVendorShippingTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    standard: 'Standard',
    express: 'Express',
    same_day: 'Same Day',
    next_day: 'Next Day',
    international: 'International',
    free: 'Free',
    pickup: 'Pickup',
    dropshipping: 'Dropshipping',
  };
  return labels[type] || type;
};

export const getVendorShippingCarrierLabel = (carrier: string): string => {
  const labels: Record<string, string> = {
    sa_paribahan: 'SA Paribahan',
    redx: 'RedX',
    pathao: 'Pathao',
    steadfast: 'Steadfast',
    sundarban: 'Sundarban',
    paperfly: 'Paperfly',
    ecourier: 'eCourier',
    dhl: 'DHL',
    fedex: 'FedEx',
    ups: 'UPS',
  };
  return labels[carrier] || carrier;
};

export const getVendorShippingZoneLabel = (zone: string): string => {
  const labels: Record<string, string> = {
    dhaka: 'Dhaka',
    chittagong: 'Chittagong',
    rajshahi: 'Rajshahi',
    khulna: 'Khulna',
    barisal: 'Barisal',
    sylhet: 'Sylhet',
    rangpur: 'Rangpur',
    mymensingh: 'Mymensingh',
    international: 'International',
  };
  return labels[zone] || zone;
};

// VENDOR_SHIPPING ডিফল্ট মান ব্যবহার করে হেল্পার
export const getVendorShippingDefaultCost = (): number => {
  return VENDOR_SHIPPING.DEFAULTS.DEFAULT_COST || 60;
};

export const getVendorShippingFreeThreshold = (): number => {
  return VENDOR_SHIPPING.DEFAULTS.FREE_SHIPPING_THRESHOLD || 1000;
};
