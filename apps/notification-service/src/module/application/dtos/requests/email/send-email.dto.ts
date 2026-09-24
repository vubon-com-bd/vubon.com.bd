import { z } from 'zod';
import { EmailMessageSchema } from '@vubon/shared-schemas/platform/notification';

export const SendEmailSchema = EmailMessageSchema;

export type SendEmailRequestDTO = z.infer<typeof SendEmailSchema>;
