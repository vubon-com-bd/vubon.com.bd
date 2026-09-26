import { GenerateEmbeddingSchema } from '../dtos/requests/embedding/generate-embedding.dto';
import { BatchEmbeddingSchema } from '../dtos/requests/embedding/batch-embedding.dto';

export class EmbeddingValidator {
  static validateGenerate(input: unknown) {
    return GenerateEmbeddingSchema.parse(input);
  }

  static validateBatch(input: unknown) {
    return BatchEmbeddingSchema.parse(input);
  }
}
