/**
 * Cart Merger
 * কার্ট মার্জার
 */

import type { Cart, CartItem } from '@vubon/shared-types';

export interface CartMergeResult {
  merged: boolean;
  cart: Cart;
  itemsMerged: number;
  itemsSkipped: number;
  conflicts: {
    productId: string;
    variantId?: string;
    guestQuantity: number;
    userQuantity: number;
    resolved: boolean;
    resolution: 'keep_user' | 'keep_guest' | 'merged';
  }[];
}

export const mergeCarts = (guestCart: Cart, userCart: Cart): CartMergeResult => {
  const conflicts: CartMergeResult['conflicts'] = [];
  let itemsMerged = 0;
  let itemsSkipped = 0;

  // Create a map of user cart items for quick lookup
  const userItemMap = new Map<string, CartItem>();
  for (const item of userCart.items) {
    const key = `${item.productId}:${item.variantId || ''}`;
    userItemMap.set(key, item);
  }

  // Merge guest items into user cart
  const mergedItems: CartItem[] = [...userCart.items];

  for (const guestItem of guestCart.items) {
    const key = `${guestItem.productId}:${guestItem.variantId || ''}`;
    const userItem = userItemMap.get(key);

    if (userItem) {
      // Conflict: same product exists in both carts
      const resolution: CartMergeResult['conflicts'][0]['resolution'] = 'merged';
      const newQuantity = Math.max(userItem.quantity, guestItem.quantity);

      // Update user item with merged quantity
      const index = mergedItems.findIndex(
        (item) => item.productId === userItem.productId && item.variantId === userItem.variantId
      );
      if (index !== -1) {
        mergedItems[index] = {
          ...mergedItems[index],
          quantity: newQuantity,
          total: newQuantity * mergedItems[index].price,
        };
      }

      conflicts.push({
        productId: guestItem.productId,
        variantId: guestItem.variantId,
        guestQuantity: guestItem.quantity,
        userQuantity: userItem.quantity,
        resolved: true,
        resolution,
      });
      itemsMerged++;
    } else {
      // No conflict, add guest item to user cart
      mergedItems.push(guestItem);
      itemsMerged++;
    }
  }

  // Update cart totals
  const mergedCart: Cart = {
    ...userCart,
    items: mergedItems,
    subtotal: mergedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    total: mergedItems.reduce((sum, item) => sum + item.total, 0),
    updatedAt: new Date(),
  };

  return {
    merged: true,
    cart: mergedCart,
    itemsMerged,
    itemsSkipped,
    conflicts,
  };
};

export const mergeCartItems = (
  items1: CartItem[],
  items2: CartItem[]
): {
  merged: CartItem[];
  conflicts: {
    productId: string;
    variantId?: string;
    quantity1: number;
    quantity2: number;
    resolution: 'keep_first' | 'keep_second' | 'sum';
  }[];
} => {
  const conflicts: {
    productId: string;
    variantId?: string;
    quantity1: number;
    quantity2: number;
    resolution: 'keep_first' | 'keep_second' | 'sum';
  }[] = [];

  const itemMap = new Map<string, { item: CartItem; from: 'first' | 'second' }>();

  for (const item of items1) {
    const key = `${item.productId}:${item.variantId || ''}`;
    itemMap.set(key, { item, from: 'first' });
  }

  for (const item of items2) {
    const key = `${item.productId}:${item.variantId || ''}`;
    const existing = itemMap.get(key);
    if (existing) {
      // Conflict: same product in both arrays
      const resolution: 'keep_first' | 'keep_second' | 'sum' = 'sum';
      conflicts.push({
        productId: item.productId,
        variantId: item.variantId,
        quantity1: existing.item.quantity,
        quantity2: item.quantity,
        resolution,
      });
      // Update quantity
      existing.item.quantity += item.quantity;
      existing.item.total = existing.item.quantity * existing.item.price;
    } else {
      itemMap.set(key, { item, from: 'second' });
    }
  }

  const merged = Array.from(itemMap.values()).map((entry) => entry.item);

  return { merged, conflicts };
};

export const resolveCartConflicts = (
  conflicts: CartMergeResult['conflicts'],
  resolution: 'keep_user' | 'keep_guest' | 'merged'
): CartMergeResult['conflicts'] => {
  return conflicts.map((conflict) => ({
    ...conflict,
    resolved: true,
    resolution: resolution === 'merged' ? 'merged' : resolution,
  }));
};
