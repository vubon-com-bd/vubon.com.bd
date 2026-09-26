import { Injectable, OnModuleInit } from '@nestjs/common';
import { CohereClient } from 'cohere-ai';
import { COHERE_CONFIG } from './cohere.config';

@Injectable()
export class CohereClientWrapper implements OnModuleInit {
  private client!: CohereClient;

  onModuleInit(): void {
    this.client = new CohereClient({ token: COHERE_CONFIG.apiKey });
  }

  get raw(): CohereClient {
    return this.client;
  }
}
