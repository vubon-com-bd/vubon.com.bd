import { Module } from '@nestjs/common';
import { HuggingFaceClient } from './huggingface.client';
import { HuggingFaceEmbeddings } from './huggingface.embeddings';
import { HuggingFaceCompletions } from './huggingface.completions';
import { HuggingFaceProvider } from './huggingface.provider';

@Module({
  providers: [HuggingFaceClient, HuggingFaceEmbeddings, HuggingFaceCompletions, HuggingFaceProvider],
  exports: [HuggingFaceProvider],
})
export class HuggingFaceModule {}
