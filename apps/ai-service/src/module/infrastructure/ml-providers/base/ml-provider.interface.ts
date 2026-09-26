import type {
  EmbedInput,
  EmbedOutput,
  CompleteInput,
  CompleteOutput,
  MlProviderHealth,
} from './ml-provider.types';

export interface MlProviderInterface {
  readonly name: string;

  embed(input: EmbedInput): Promise<EmbedOutput>;
  complete(input: CompleteInput): Promise<CompleteOutput>;
  health(): Promise<MlProviderHealth>;

  supports(model: string): boolean;
  listModels(): readonly string[];
}
