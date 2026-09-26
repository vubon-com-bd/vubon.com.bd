import { Global, Module } from '@nestjs/common';
import { SearchEngineService } from '../../services/external/search-engine.service';

@Global()
@Module({
  providers: [SearchEngineService],
  exports: [SearchEngineService],
})
export class SearchModule {}
