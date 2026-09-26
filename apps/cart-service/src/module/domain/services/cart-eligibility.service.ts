import type { CartEntity } from '../entities/cart.entity';

export class CartEligibilityService {
  canCheckout(cart: CartEntity): boolean {
    if (cart.isDeleted()) return false;
    if (cart.isEmpty) return false;
    if (cart.status.value === 'abandoned') return false;
    if (cart.status.value === 'converted') return false;
    return true;
  }

  canAddItem(cart: CartEntity): boolean {
    if (cart.isDeleted()) return false;
    return cart.status.value === 'active';
  }
}
