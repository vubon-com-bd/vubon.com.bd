import { Logger } from '@nestjs/common';
import type { ProviderInterface } from './provider.interface';
import type { ProviderConfig, ProviderSendInput, ProviderSendResult } from './provider.types';

export abstract class AbstractProvider implements ProviderInterface {
  abstract readonly name: string;
  abstract readonly channel: string;
  protected readonly logger: Logger;
  protected readonly config: ProviderConfig;

  constructor(config: ProviderConfig = {}) {
    this.config = config;
    this.logger = new Logger(this.constructor.name);
  }

  abstract send(input: ProviderSendInput): Promise<ProviderSendResult>;

  async isAvailable(): Promise<boolean> {
    return true;
  }

  protected buildResult(
    success: boolean,
    messageId: string | null,
    error: string | null = null,
  ): ProviderSendResult {
    return {
      success,
      messageId,
      providerName: this.name,
      error,
    };
  }

  protected generateMessageId(): string {
    return `${this.name}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}
