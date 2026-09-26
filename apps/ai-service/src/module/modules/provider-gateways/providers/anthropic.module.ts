import { Module } from '@nestjs/common';
import { AnthropicClient } from '../../../infrastructure/ml-providers/anthropic/anthropic.client';
import { AnthropicCompletions } from '../../../infrastructure/ml-providers/anthropic/anthropic.completions';
import { AnthropicProvider } from '../../../infrastructure/ml-providers/anthropic/anthropic.provider';

@Module({
  providers: [AnthropicClient, AnthropicCompletions, AnthropicProvider],
  exports: [AnthropicProvider],
})
export class AnthropicModule {}
