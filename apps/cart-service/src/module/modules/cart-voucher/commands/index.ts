import { ApplyVoucherHandler } from '../../../application/commands/voucher/apply-voucher.handler.js';
import { RemoveVoucherHandler } from '../../../application/commands/voucher/remove-voucher.handler.js';

export const CART_VOUCHER_COMMAND_HANDLERS = [
  ApplyVoucherHandler,
  RemoveVoucherHandler,
] as const;

export { ApplyVoucherHandler, RemoveVoucherHandler };
