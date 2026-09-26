import { Injectable, Logger } from '@nestjs/common';
import { MlProvidersService } from '../../ml-providers/ml-providers.service';
import type { ModelEntity } from '../../../domain/entities/model.entity';

interface InferenceOutput {
  readonly text: string;
  readonly tokensUsed: number;
  readonly latencyMs: number;
}

@Injectable()
export class ModelInferenceService {
  private readonly logger = new Logger(ModelInferenceService.name);

  constructor(private readonly providers: MlProvidersService) {}

  async infer(model: ModelEntity, prompt: string, maxTokens = 1000): Promise<InferenceOutput> {
    const start = Date.now();
    const provider = this.providers.findByModel(model.name.value) ?? this.providers.get('openai');
    const result = await provider.complete({ prompt, maxTokens });
    const latencyMs = Date.now() - start;
    this.logger.log(`Inference complete: ${model.id.value}, ${latencyMs}ms`);
    return { text: result.text, tokensUsed: result.tokensUsed, latencyMs };
  }
}
