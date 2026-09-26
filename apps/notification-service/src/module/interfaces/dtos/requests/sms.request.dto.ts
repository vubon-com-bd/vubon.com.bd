import { z } from 'zod';
import {
  SendSmsSchema,
  SendBulkSmsSchema,
} from '../../../application/dtos/requests/sms';

export const SmsRequestSchema = SendSmsSchema;
export const SmsBulkRequestSchema = SendBulkSmsSchema;

export type SmsRequestDTO = z.infer<typeof SmsRequestSchema>;
export type SmsBulkRequestDTO = z.infer<typeof SmsBulkRequestSchema>;
