import { Module } from '@nestjs/common';
import { CohereClientWrapper } from './cohere.client';
import { CohereProvider } from './cohere.provider';

@Module({
  providers: [CohereClientWrapper, CohereProvider],
  exports: [CohereProvider],
})
export class CohereModule {}
