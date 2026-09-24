import type { FaqEntity } from '../../../domain/entities/faq.entity';
import type { FaqIdVO } from '../../../domain/value-objects/primitives/faq-id.vo';

export interface FaqServiceInterface {
  findById(id: FaqIdVO): Promise<FaqEntity | null>;
  listPublished(): Promise<readonly FaqEntity[]>;
  search(keyword: string): Promise<readonly FaqEntity[]>;
}
