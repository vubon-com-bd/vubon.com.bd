import { z } from 'zod';
import {
  CreateWebhookSchema,
  UpdateWebhookSchema,
  TestWebhookSchema,
} from '../../../application/dtos/requests/webhook';

export const WebhookCreateRequestSchema = CreateWebhookSchema;
export const WebhookUpdateRequestSchema = UpdateWebhookSchema;
export const WebhookTestRequestSchema = TestWebhookSchema;

export type WebhookCreateRequestDTO = z.infer<typeof WebhookCreateRequestSchema>;
export type WebhookUpdateRequestDTO = z.infer<typeof WebhookUpdateRequestSchema>;
export type WebhookTestRequestDTO = z.infer<typeof WebhookTestRequestSchema>;
