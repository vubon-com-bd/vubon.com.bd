import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AiSummaryEntity } from '../entities/ai-summary.entity';

export interface AiSummaryRepository
  extends BaseRepository<AiSummaryEntity, string> {
  findBySource(sourceId: string, sourceType: string): Promise<readonly AiSummaryEntity[]>;
  findByKeyword(keyword: string): Promise<readonly AiSummaryEntity[]>;
  findByLanguage(language: string): Promise<readonly AiSummaryEntity[]>;
}
