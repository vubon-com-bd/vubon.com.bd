import { Injectable } from '@nestjs/common';
import type { KnowledgeBaseServiceInterface } from '../interfaces/knowledge-base.service.interface';
import type { KnowledgeArticleRepository } from '../../../domain/repositories/knowledge-article.repository.interface';
import { KnowledgeArticleEntity } from '../../../domain/entities/knowledge-article.entity';
import { KnowledgeArticleIdVO } from '../../../domain/value-objects/primitives/knowledge-article-id.vo';

@Injectable()
export class KnowledgeBaseService implements KnowledgeBaseServiceInterface {
  constructor(private readonly kbRepo: KnowledgeArticleRepository) {}

  async findById(id: KnowledgeArticleIdVO): Promise<KnowledgeArticleEntity | null> {
    return this.kbRepo.findById(id);
  }

  async listPublished(): Promise<readonly KnowledgeArticleEntity[]> {
    return this.kbRepo.findPublished();
  }

  async search(keyword: string): Promise<readonly KnowledgeArticleEntity[]> {
    return this.kbRepo.searchByKeyword(keyword);
  }
}
