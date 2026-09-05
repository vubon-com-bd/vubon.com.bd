/**
 * Stock Calculator
 * স্টক ক্যালকুলেটর
 */

import type { Inventory } from '@vubon/shared-types';

export interface StockStatus {
  available: number;
  reserved: number;
  inStock: boolean;
  isLowStock: boolean;
  isOutOfStock: boolean;
  isBackOrder: boolean;
  isPreOrder: boolean;
  threshold: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'back_order' | 'pre_order';
}

export interface StockStats {
  totalQuantity: number;
  totalReserved: number;
  totalAvailable: number;
  totalSold: number;
  averageStock: number;
}

export const calculateAvailableStock = (inventory: Inventory): number => {
  return inventory.quantity - inventory.reserved;
};

export const calculateStockStatus = (inventory: Inventory): StockStatus => {
  const available = calculateAvailableStock(inventory);
  const threshold = inventory.lowStockThreshold || 10;

  let status: StockStatus['status'] = 'in_stock';
  let inStock = true;
  let isLowStock = false;
  let isOutOfStock = false;

  if (available <= 0) {
    status = 'out_of_stock';
    inStock = false;
    isOutOfStock = true;
  } else if (available <= threshold) {
    status = 'low_stock';
    isLowStock = true;
  }

  return {
    available,
    reserved: inventory.reserved,
    inStock,
    isLowStock,
    isOutOfStock,
    isBackOrder: false,
    isPreOrder: false,
    threshold,
    status,
  };
};

export const calculateTotalStock = (inventories: Inventory[]): number => {
  return inventories.reduce((sum, inv) => sum + inv.quantity, 0);
};

export const calculateTotalAvailableStock = (inventories: Inventory[]): number => {
  return inventories.reduce((sum, inv) => sum + calculateAvailableStock(inv), 0);
};

export const calculateStockStats = (inventories: Inventory[]): StockStats => {
  const totalQuantity = calculateTotalStock(inventories);
  const totalReserved = inventories.reduce((sum, inv) => sum + inv.reserved, 0);
  const totalAvailable = calculateTotalAvailableStock(inventories);
  const totalSold = inventories.reduce(
    (sum, inv) => sum + (inv.quantity - inv.available - inv.reserved),
    0
  );
  const averageStock = inventories.length > 0 ? totalQuantity / inventories.length : 0;

  return {
    totalQuantity,
    totalReserved,
    totalAvailable,
    totalSold: Math.max(0, totalSold),
    averageStock: Math.round(averageStock * 100) / 100,
  };
};

export const isLowStock = (inventory: Inventory): boolean => {
  const available = calculateAvailableStock(inventory);
  const threshold = inventory.lowStockThreshold || 10;
  return available <= threshold && available > 0;
};

export const isOutOfStock = (inventory: Inventory): boolean => {
  return calculateAvailableStock(inventory) <= 0;
};

export const isInStock = (inventory: Inventory): boolean => {
  return calculateAvailableStock(inventory) > 0;
};

export const getStockLevel = (inventory: Inventory): 'high' | 'medium' | 'low' | 'out' => {
  const available = calculateAvailableStock(inventory);
  const threshold = inventory.lowStockThreshold || 10;

  if (available <= 0) return 'out';
  if (available <= threshold) return 'low';
  if (available <= threshold * 2) return 'medium';
  return 'high';
};

export const calculateRestockNeeded = (inventory: Inventory): number => {
  const available = calculateAvailableStock(inventory);
  const threshold = inventory.lowStockThreshold || 10;
  if (available >= threshold) return 0;
  return threshold - available;
};
