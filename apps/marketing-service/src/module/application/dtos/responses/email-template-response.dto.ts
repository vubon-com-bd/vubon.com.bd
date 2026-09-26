import { z } from 'zod';
import { EmailMarketingPublicSchema } from '@vubon/shared-schemas/marketing';

export type EmailTemplateResponseDTO = z.infer<typeof EmailMarketingPublicSchema>;
