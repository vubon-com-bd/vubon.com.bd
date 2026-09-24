import { Injectable, Logger } from '@nestjs/common';

export interface AnalyzeSentimentInput {
  readonly text: string;
}

export interface AnalyzeSentimentResult {
  readonly sentiment: 'positive' | 'neutral' | 'negative';
  readonly score: number;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  async analyzeSentiment(
    input: AnalyzeSentimentInput,
  ): Promise<AnalyzeSentimentResult> {
    // Real implementation: openai
    this.logger.debug(`Analyzing sentiment for: ${input.text.slice(0, 40)}`);
    return { sentiment: 'neutral', score: 0 };
  }

  async generateEmbedding(text: string): Promise<readonly number[]> {
    // Real implementation: openai embeddings
    this.logger.debug(`Generating embedding for: ${text.slice(0, 40)}`);
    return [];
  }
}
