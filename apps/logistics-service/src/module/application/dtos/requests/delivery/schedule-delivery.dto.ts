import { z } from 'zod';
import { DeliveryScheduleInputSchema } from '@vubon/shared-schemas/logistics';

export type ScheduleDeliveryRequestDTO = z.infer<typeof DeliveryScheduleInputSchema>;
