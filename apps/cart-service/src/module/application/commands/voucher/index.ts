export * from './apply-voucher.command.js';
export * from './apply-voucher.handler.js';
export * from './remove-voucher.command.js';
export * from './remove-voucher.handler.js';

import { ApplyVoucherHandler } from './apply-voucher.handler.js';
import { RemoveVoucherHandler } from './remove-voucher.handler.js';

export const VOUCHER_COMMAND_HANDLERS = [
  ApplyVoucherHandler,
  RemoveVoucherHandler,
] as const;
