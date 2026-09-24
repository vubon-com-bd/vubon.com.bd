import { z } from 'zod';
import { SupportMessageInputSchema } from '@vubon/shared-schemas/support';

export type SendMessageRequestDTO = z.infer<typeof SupportMessageInputSchema>;
