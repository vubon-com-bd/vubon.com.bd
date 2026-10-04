/**
 * Reindex CLI — triggers Meilisearch bulk reindex.
 *
 * Usage:
 *   pnpm ts-node scripts/reindex.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/module/modules/app.module.js';
import { SearchIndexerService } from '../src/module/infrastructure/services/external/search-indexer.service.js';

async function main(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule);

  console.log('🔍 Ensuring search indices...');
  const indexer = app.get(SearchIndexerService);
  await indexer.ensureIndices();

  console.log('📦 Reindexing all entities...');
  const result = await indexer.reindexAll();

  console.log('✅ Reindex complete:');
  console.log(`   Products:   ${result.products}`);
  console.log(`   Categories: ${result.categories}`);
  console.log(`   Brands:     ${result.brands}`);

  await app.close();
}

main().catch((err) => {
  console.error('❌ Reindex failed:', err);
  process.exit(1);
});
