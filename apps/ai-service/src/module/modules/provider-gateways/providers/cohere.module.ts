import { Module } from '@nestjs/common';
import { CohereClientWrapper } from '../../../infrastructure/ml-providers/cohere/cohere.client';
import { CohereProvider } from '../../../infrastructure/ml-providers/cohere/cohere.provider';

@Module({
  providers: [CohereClientWrapper, CohereProvider],
  exports: [CohereProvider],
})
export class CohereModule {}
