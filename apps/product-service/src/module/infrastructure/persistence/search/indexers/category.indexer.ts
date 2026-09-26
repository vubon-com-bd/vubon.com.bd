import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../../../../domain/entities/category.entity';
import { SearchService } from '../search.service';

@Injectable()
export class CategoryIndexer {
  constructor(private readonly search: SearchService) {}

  async index(category: CategoryEntity): Promise<void> {
    await this.search.index(category.id.value, {
      name: category.name.value,
      slug: category.slug.value,
      path: category.path.value,
    });
  }
}
