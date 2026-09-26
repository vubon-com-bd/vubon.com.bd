import { Injectable, Logger } from '@nestjs/common';
import { VectorDbFactory } from '../../vector-db/vector-db.factory';

@Injectable()
export class VectorIndexBuilderService {
  private readonly logger = new Logger(VectorIndexBuilderService.name);

  constructor(private readonly factory: VectorDbFactory) {}

  async build(provider: string, name: string, dimension: number, metric: 'cosine' | 'euclidean' | 'dot' = 'cosine'): Promise<void> {
    const db = this.factory.get(provider);
    await db.createIndex({ name, dimension, metric });
    this.logger.log(`Vector index built: ${name} on ${provider}`);
  }

  async rebuild(provider: string, name: string, dimension: number, metric: 'cosine' | 'euclidean' | 'dot' = 'cosine'): Promise<void> {
    const db = this.factory.get(provider);
    await db.deleteIndex(name);
    await db.createIndex({ name, dimension, metric });
    this.logger.log(`Vector index rebuilt: ${name}`);
  }
}
