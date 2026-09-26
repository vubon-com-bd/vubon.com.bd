import { Injectable, OnModuleInit } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GOOGLE_AI_CONFIG } from './google-ai.config';

@Injectable()
export class GoogleAiClient implements OnModuleInit {
  private client!: GoogleGenerativeAI;

  onModuleInit(): void {
    this.client = new GoogleGenerativeAI(GOOGLE_AI_CONFIG.apiKey);
  }

  get raw(): GoogleGenerativeAI {
    return this.client;
  }

  getModel(modelName?: string) {
    return this.client.getGenerativeModel({
      model: modelName ?? GOOGLE_AI_CONFIG.defaultModel,
    });
  }
}
