import { z } from 'zod';
import { NotificationSchema } from '@vubon/shared-schemas/platform/notification';

export type NotificationDetailResponseDTO = z.infer<typeof NotificationSchema>;
