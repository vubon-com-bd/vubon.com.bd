import { z } from 'zod';
import { TicketCreateInputSchema } from '@vubon/shared-schemas/support';

export type CreateTicketRequestDTO = z.infer<typeof TicketCreateInputSchema>;
