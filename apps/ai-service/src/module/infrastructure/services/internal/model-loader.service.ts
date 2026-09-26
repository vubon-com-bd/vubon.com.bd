import { Injectable, Logger } from '@nestjs/common';
import type { ModelEntity } from '../../../domain/entities/model.entity';

interface LoadedModel {
  readonly id: string;
  readonly name: string;
  readonly endpoint: string;
  readonly loadedAt: Date;
}

@Injectable()
export class ModelLoaderService {
  private readonly logger = new Logger(ModelLoaderService.name);
  private readonly loaded = new Map<string, LoadedModel>();

  async load(model: ModelEntity): Promise<LoadedModel> {
    const existing = this.loaded.get(model.id.value);
    if (existing) return existing;

    if (!model.endpoint) {
      throw new Error(`Model ${model.id.value} has no endpoint`);
    }

    const loaded: LoadedModel = {
      id: model.id.value,
      name: model.name.value,
      endpoint: model.endpoint.value,
      loadedAt: new Date(),
    };
    this.loaded.set(model.id.value, loaded);
    this.logger.log(`Model loaded: ${model.name.value}`);
    return loaded;
  }

  unload(modelId: string): void {
    this.loaded.delete(modelId);
  }

  isLoaded(modelId: string): boolean {
    return this.loaded.has(modelId);
  }

  list(): readonly LoadedModel[] {
    return [...this.loaded.values()];
  }
}
