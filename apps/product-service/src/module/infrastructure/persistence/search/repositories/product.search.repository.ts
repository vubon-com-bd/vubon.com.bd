import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../../../../domain/entities/product.entity';
import { SearchService } from '../search.service';

@Injectable()
export class ProductSearchRepository {
  constructor(private readonly search: SearchService) {}

  async searchProducts(term: string): Promise<readonly ProductEntity[]> {
    void term;
    void this.search;
    return [];
  }
}
