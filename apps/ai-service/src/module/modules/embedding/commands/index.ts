import { GenerateEmbeddingHandler } from '../../../application/commands/embedding/generate-embedding.handler';
import { BatchEmbeddingHandler } from '../../../application/commands/embedding/batch-embedding.handler';
import { DeleteEmbeddingHandler } from '../../../application/commands/embedding/delete-embedding.handler';

export const EmbeddingCommandHandlers = [
  GenerateEmbeddingHandler,
  BatchEmbeddingHandler,
  DeleteEmbeddingHandler,
];
