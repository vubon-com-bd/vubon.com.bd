import { Module } from '@nestjs/common';
import { HuggingFaceClient } from '../../../infrastructure/ml-providers/huggingface/huggingface.client';
import { HuggingFaceEmbeddings } from '../../../infrastructure/ml-providers/huggingface/huggingface.embeddings';
import { HuggingFaceCompletions } from '../../../infrastructure/ml-providers/huggingface/huggingface.completions';
import { HuggingFaceProvider } from '../../../infrastructure/ml-providers/huggingface/huggingface.provider';

@Module({
  providers: [HuggingFaceClient, HuggingFaceEmbeddings, HuggingFaceCompletions, HuggingFaceProvider],
  exports: [HuggingFaceProvider],
})
export class HuggingFaceModule {}
