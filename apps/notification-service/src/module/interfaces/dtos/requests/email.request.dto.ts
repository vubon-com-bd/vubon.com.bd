import { z } from 'zod';
import {
  SendEmailSchema,
  SendTemplateEmailSchema,
  SendBulkEmailSchema,
} from '../../../application/dtos/requests/email';

export const EmailRequestSchema = SendEmailSchema;
export const EmailTemplateRequestSchema = SendTemplateEmailSchema;
export const EmailBulkRequestSchema = SendBulkEmailSchema;

export type EmailRequestDTO = z.infer<typeof EmailRequestSchema>;
export type EmailTemplateRequestDTO = z.infer<typeof EmailTemplateRequestSchema>;
export type EmailBulkRequestDTO = z.infer<typeof EmailBulkRequestSchema>;
