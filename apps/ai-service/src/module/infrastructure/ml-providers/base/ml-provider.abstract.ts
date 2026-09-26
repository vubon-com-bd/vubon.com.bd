import type { MlProviderInterface } from './ml-provider.interface';
import type {
  EmbedInput,
  EmbedOutput,
  CompleteInput,
  CompleteOutput,
  MlProviderHealth,
} from './ml-provider.types';

export abstract class MlProviderAbstract implements MlProviderInterface {
  abstract readonly name: string;

  abstract embed(input: EmbedInput): Promise<EmbedOutput>;
  abstract complete(input: CompleteInput): Promise<CompleteOutput>;
  abstract supports(model: string): boolean;

  protected abstract defaultModels(): readonly string[];

  listModels(): readonly string[] {
    return this.defaultModels();
  }

  async health(): Promise<MlProviderHealth> {
    const start = Date.now();
    try {
      await this.embed({ texts: ['ping'], dimension: 8 });
      return { healthy: true, latencyMs: Date.now() - start };
    } catch (error) {
      return {
        healthy: false,
        latencyMs: Date.now() - start,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
