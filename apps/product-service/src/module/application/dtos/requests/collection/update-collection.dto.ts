import { z } from 'zod';

export const UpdateCollectionRequestSchema = z.object({
  collectionId: z.string().min(1),
  name: z.string().min(1).max(100).optional(),
  type: z.enum(['manual', 'automatic', 'featured', 'seasonal', 'trending']).optional(),
});

export type UpdateCollectionRequestDTO = z.infer<typeof UpdateCollectionRequestSchema>;
