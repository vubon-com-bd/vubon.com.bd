import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmbeddingProvider {
  private readonly logger = new Logger(EmbeddingProvider.name);

  async generate(text: string): Promise<readonly number[]> {
    // Real implementation: openai embeddings
    this.logger.debug(`Embedding: ${text.slice(0, 40)}`);
    return [];
  }
}
