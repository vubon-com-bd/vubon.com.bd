// application/commands/index.ts — All commands barrel export
export * from './cart/index.js';
export * from './item/index.js';
export * from './coupon/index.js';
export * from './voucher/index.js';
export * from './shipping/index.js';
export * from './saved/index.js';
export * from './guest/index.js';
export * from './checkout/index.js';

import { CART_COMMAND_HANDLERS } from './cart/index.js';
import { ITEM_COMMAND_HANDLERS } from './item/index.js';
import { COUPON_COMMAND_HANDLERS } from './coupon/index.js';
import { VOUCHER_COMMAND_HANDLERS } from './voucher/index.js';
import { SHIPPING_COMMAND_HANDLERS } from './shipping/index.js';
import { SAVED_COMMAND_HANDLERS } from './saved/index.js';
import { GUEST_COMMAND_HANDLERS } from './guest/index.js';
import { CHECKOUT_COMMAND_HANDLERS } from './checkout/index.js';

export const ALL_COMMAND_HANDLERS = [
  ...CART_COMMAND_HANDLERS,
  ...ITEM_COMMAND_HANDLERS,
  ...COUPON_COMMAND_HANDLERS,
  ...VOUCHER_COMMAND_HANDLERS,
  ...SHIPPING_COMMAND_HANDLERS,
  ...SAVED_COMMAND_HANDLERS,
  ...GUEST_COMMAND_HANDLERS,
  ...CHECKOUT_COMMAND_HANDLERS,
] as const;
