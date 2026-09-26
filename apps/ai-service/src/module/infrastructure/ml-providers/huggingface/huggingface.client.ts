import { Injectable, OnModuleInit } from '@nestjs/common';
import { HfInference } from '@huggingface/inference';
import { HUGGINGFACE_CONFIG } from './huggingface.config';

@Injectable()
export class HuggingFaceClient implements OnModuleInit {
  private client!: HfInference;

  onModuleInit(): void {
    this.client = new HfInference(HUGGINGFACE_CONFIG.apiKey);
  }

  get raw(): HfInference {
    return this.client;
  }
}
