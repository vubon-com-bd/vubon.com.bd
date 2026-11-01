import { UpdateReturnPolicyHandler } from '../../../application/commands/return-policy/update-return-policy.handler.js';

export const VENDOR_RETURN_POLICY_COMMAND_HANDLERS = [
  UpdateReturnPolicyHandler,
] as const;

export { UpdateReturnPolicyHandler };
