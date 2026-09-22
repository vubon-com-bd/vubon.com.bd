import { z } from 'zod';

export const DeleteCollectionRequestSchema = z.object({
  collectionId: z.string().min(1),
});

export type DeleteCollectionRequestDTO = z.infer<typeof DeleteCollectionRequestSchema>;
