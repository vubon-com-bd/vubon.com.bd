import { GetReturnPolicyHandler } from '../../../application/queries/return-policy/get-return-policy.handler.js';

export const VENDOR_RETURN_POLICY_QUERY_HANDLERS = [GetReturnPolicyHandler] as const;

export { GetReturnPolicyHandler };
