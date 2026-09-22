import { z } from 'zod';
import { PaymentPublicSchema } from '@vubon/shared-schemas/business/payment';

export type PaymentPublicResponseDTO = z.infer<typeof PaymentPublicSchema>;
