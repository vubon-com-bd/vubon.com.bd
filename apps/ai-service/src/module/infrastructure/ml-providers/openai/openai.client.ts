import { Injectable, OnModuleInit } from '@nestjs/common';
import OpenAI from 'openai';
import { OPENAI_CONFIG } from './openai.config';

@Injectable()
export class OpenAiClient implements OnModuleInit {
  private client!: OpenAI;

  onModuleInit(): void {
    this.client = new OpenAI({
      apiKey: OPENAI_CONFIG.apiKey,
      baseURL: OPENAI_CONFIG.baseUrl,
      maxRetries: OPENAI_CONFIG.maxRetries,
      timeout: OPENAI_CONFIG.timeoutMs,
    });
  }

  get raw(): OpenAI {
    return this.client;
  }
}
