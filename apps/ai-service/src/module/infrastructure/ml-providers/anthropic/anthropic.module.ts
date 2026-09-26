import { Module } from '@nestjs/common';
import { AnthropicClient } from './anthropic.client';
import { AnthropicCompletions } from './anthropic.completions';
import { AnthropicProvider } from './anthropic.provider';

@Module({
  providers: [AnthropicClient, AnthropicCompletions, AnthropicProvider],
  exports: [AnthropicProvider],
})
export class AnthropicModule {}
