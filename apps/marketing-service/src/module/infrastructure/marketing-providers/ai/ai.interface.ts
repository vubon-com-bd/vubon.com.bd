export interface GenerateOptions {
  readonly prompt: string;
  readonly maxTokens?: number;
}

export interface GenerateResult {
  readonly text: string;
}

export interface ContentGenerator {
  generate(options: GenerateOptions): Promise<GenerateResult>;
}
