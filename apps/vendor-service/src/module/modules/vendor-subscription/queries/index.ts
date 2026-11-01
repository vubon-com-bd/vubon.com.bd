import { GetSubscriptionHandler } from '../../../application/queries/subscription/get-subscription.handler.js';
import { ListPlansHandler } from '../../../application/queries/subscription/list-plans.handler.js';

export const VENDOR_SUBSCRIPTION_QUERY_HANDLERS = [
  GetSubscriptionHandler,
  ListPlansHandler,
] as const;

export { GetSubscriptionHandler, ListPlansHandler };
