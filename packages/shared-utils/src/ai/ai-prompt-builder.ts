export interface AIPromptData {
  promptId: string;
  aiId: string;
  type: string;
  template: string;
  variables: string[];
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  maxLength: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export class AIPromptBuilder {
  private template = '';
  private variables: Record<string, unknown> = {};
  private temperature = 0.7;
  private topP = 0.9;
  private maxLength = 4096;
  private frequencyPenalty = 0;
  private presencePenalty = 0;

  setTemplate(template: string): this {
    this.template = template;
    return this;
  }

  addVariable(key: string, value: unknown): this {
    this.variables[key] = value;
    return this;
  }

  setTemperature(temperature: number): this {
    this.temperature = temperature;
    return this;
  }

  setTopP(topP: number): this {
    this.topP = topP;
    return this;
  }

  setMaxLength(maxLength: number): this {
    this.maxLength = maxLength;
    return this;
  }

  setFrequencyPenalty(penalty: number): this {
    this.frequencyPenalty = penalty;
    return this;
  }

  setPresencePenalty(penalty: number): this {
    this.presencePenalty = penalty;
    return this;
  }

  build(): string {
    let result = this.template;
    for (const [key, value] of Object.entries(this.variables)) {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
    }
    return result;
  }

  buildPrompt(): AIPromptData {
    return {
      promptId: crypto.randomUUID(),
      aiId: '',
      type: 'content_generation',
      template: this.template,
      variables: Object.keys(this.variables),
      temperature: this.temperature,
      topP: this.topP,
      frequencyPenalty: this.frequencyPenalty,
      presencePenalty: this.presencePenalty,
      maxLength: this.maxLength,
      isActive: true,
      metadata: {},
    };
  }
}
