import { Injectable } from '@nestjs/common';
import { CustomProvider, type ClassifyInput, type IntentResult } from '../providers/custom.provider';

@Injectable()
export class IntentClassifier {
  constructor(private readonly provider: CustomProvider) {}

  async classify(input: ClassifyInput): Promise<IntentResult> {
    return this.provider.detectIntent(input);
  }
}
