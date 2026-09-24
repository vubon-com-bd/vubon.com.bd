import { Injectable } from '@nestjs/common';
import { AiService, type AnalyzeSentimentResult } from './ai.service';

@Injectable()
export class SentimentProvider {
  constructor(private readonly ai: AiService) {}

  async analyze(text: string): Promise<AnalyzeSentimentResult> {
    return this.ai.analyzeSentiment({ text });
  }
}
