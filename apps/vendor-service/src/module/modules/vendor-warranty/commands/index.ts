import { UpdateWarrantyHandler } from '../../../application/commands/warranty/update-warranty.handler.js';

export const VENDOR_WARRANTY_COMMAND_HANDLERS = [UpdateWarrantyHandler] as const;

export { UpdateWarrantyHandler };
