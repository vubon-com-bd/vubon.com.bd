/**
 * Digest Query Handlers Barrel
 * @module notification-service/modules/digest/queries
 */
import { GetDigestHandler } from '@application/queries/digest/get-digest.handler.js';
import { ListDigestsHandler } from '@application/queries/digest/list-digests.handler.js';

export const DIGEST_QUERY_HANDLERS = [
  GetDigestHandler,
  ListDigestsHandler,
] as const;

export { GetDigestHandler, ListDigestsHandler };
