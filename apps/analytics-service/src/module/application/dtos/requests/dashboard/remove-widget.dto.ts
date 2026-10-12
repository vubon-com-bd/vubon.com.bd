/**
 * Remove Widget Request DTO
 * @module analytics-service/application/dtos/requests/dashboard
 */
import { z } from 'zod';

export const RemoveWidgetSchema = z.object({
  widgetId: z.string().min(1).max(128),
});

export type RemoveWidgetDto = z.input<typeof RemoveWidgetSchema>;
