// queries/digest/index.ts
export * from './get-digest.query.js';
export * from './get-digest.handler.js';
export * from './list-digests.query.js';
export * from './list-digests.handler.js';
export * from './preview-digest.query.js';
export * from './preview-digest.handler.js';

import { GetDigestHandler } from './get-digest.handler.js';
import { ListDigestsHandler } from './list-digests.handler.js';
import { PreviewDigestHandler } from './preview-digest.handler.js';

export const DIGEST_QUERY_HANDLERS = [
  GetDigestHandler,
  ListDigestsHandler,
  PreviewDigestHandler,
] as const;
