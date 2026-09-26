import { z } from 'zod';
import {
  SendPushSchema,
  SendBulkPushSchema,
} from '../../../application/dtos/requests/push';

export const PushRequestSchema = SendPushSchema;
export const PushBulkRequestSchema = SendBulkPushSchema;

export type PushRequestDTO = z.infer<typeof PushRequestSchema>;
export type PushBulkRequestDTO = z.infer<typeof PushBulkRequestSchema>;
