import { z } from 'zod';
import { TransactionPublicSchema } from '@vubon/shared-schemas/business/payment';

export type TransactionResponseDTO = z.infer<typeof TransactionPublicSchema>;
