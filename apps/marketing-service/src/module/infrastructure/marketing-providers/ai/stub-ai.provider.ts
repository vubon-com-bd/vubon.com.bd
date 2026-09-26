import { Injectable, Logger } from '@nestjs/common';
import type { ContentGenerator, GenerateOptions, GenerateResult } from './ai.interface';

@Injectable()
export class StubAiProvider implements ContentGenerator {
  private readonly logger = new Logger(StubAiProvider.name);

  async generate(options: GenerateOptions): Promise<GenerateResult> {
    this.logger.log(`[STUB] Generate: ${options.prompt.slice(0, 50)}...`);
    return { text: '[STUB] Generated content' };
  }
}
