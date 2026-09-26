import { z } from 'zod';

export const AddProductToCollectionRequestSchema = z.object({
  collectionId: z.string().min(1),
  productId: z.string().min(1),
});

export type AddProductToCollectionRequestDTO = z.infer<typeof AddProductToCollectionRequestSchema>;
