/**
 * HTTP Headers Schema
 * @module shared-schemas/common/api
 */

import { z } from 'zod';

export const RequestHeadersSchema = z
  .object({
    authorization: z.string().optional(),
    'content-type': z.string().optional(),
    accept: z.string().optional(),
    'accept-language': z.string().optional(),
    'user-agent': z.string().optional(),
    'x-request-id': z.string().optional(),
    'x-api-key': z.string().optional(),
    'x-csrf-token': z.string().optional(),
    'x-forwarded-for': z.string().optional(),
  })
  .passthrough();

export const ResponseHeadersSchema = z
  .object({
    'content-type': z.string().optional(),
    'content-length': z.string().optional(),
    'cache-control': z.string().optional(),
    'x-request-id': z.string().optional(),
    'x-rate-limit-limit': z.string().optional(),
    'x-rate-limit-remaining': z.string().optional(),
    'x-rate-limit-reset': z.string().optional(),
  })
  .passthrough();

export type RequestHeadersSchemaType = z.infer<typeof RequestHeadersSchema>;
export type ResponseHeadersSchemaType = z.infer<typeof ResponseHeadersSchema>;
