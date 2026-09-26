import { z } from 'zod';

export const CreateCollectionRequestSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.enum(['manual', 'automatic', 'featured', 'seasonal', 'trending']),
});

export type CreateCollectionRequestDTO = z.infer<typeof CreateCollectionRequestSchema>;
