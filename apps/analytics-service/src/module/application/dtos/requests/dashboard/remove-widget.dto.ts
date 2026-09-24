import { z } from 'zod';

export const RemoveWidgetSchema = z
  .object({
    dashboardId: z.string().min(1).max(128),
    widgetId: z.string().min(1).max(128),
  })
  .strict();

export type RemoveWidgetDTO = z.infer<typeof RemoveWidgetSchema>;
