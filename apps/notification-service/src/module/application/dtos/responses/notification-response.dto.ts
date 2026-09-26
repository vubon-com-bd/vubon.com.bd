import { z } from 'zod';
import { NotificationPublicSchema } from '@vubon/shared-schemas/platform/notification';

export type NotificationResponseDTO = z.infer<typeof NotificationPublicSchema>;
