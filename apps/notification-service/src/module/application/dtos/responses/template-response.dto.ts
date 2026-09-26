import { z } from 'zod';
import { NotificationTemplateSchema } from '@vubon/shared-schemas/platform/notification';

export type TemplateResponseDTO = z.infer<typeof NotificationTemplateSchema>;
