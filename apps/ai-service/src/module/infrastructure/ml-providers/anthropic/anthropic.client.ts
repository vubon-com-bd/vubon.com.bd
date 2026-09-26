import { Injectable, OnModuleInit } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';
import { ANTHROPIC_CONFIG } from './anthropic.config';

@Injectable()
export class AnthropicClient implements OnModuleInit {
  private client!: Anthropic;

  onModuleInit(): void {
    this.client = new Anthropic({
      apiKey: ANTHROPIC_CONFIG.apiKey,
      baseURL: ANTHROPIC_CONFIG.baseUrl,
      maxRetries: ANTHROPIC_CONFIG.maxRetries,
      timeout: ANTHROPIC_CONFIG.timeoutMs,
    });
  }

  get raw(): Anthropic {
    return this.client;
  }
}
