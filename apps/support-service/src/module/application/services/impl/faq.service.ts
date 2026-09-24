import { Injectable } from '@nestjs/common';
import type { FaqServiceInterface } from '../interfaces/faq.service.interface';
import type { FaqRepository } from '../../../domain/repositories/faq.repository.interface';
import { FaqEntity } from '../../../domain/entities/faq.entity';
import { FaqIdVO } from '../../../domain/value-objects/primitives/faq-id.vo';

@Injectable()
export class FaqService implements FaqServiceInterface {
  constructor(private readonly faqRepo: FaqRepository) {}

  async findById(id: FaqIdVO): Promise<FaqEntity | null> {
    return this.faqRepo.findById(id);
  }

  async listPublished(): Promise<readonly FaqEntity[]> {
    return this.faqRepo.findPublished();
  }

  async search(keyword: string): Promise<readonly FaqEntity[]> {
    return this.faqRepo.searchByKeyword(keyword);
  }
}
