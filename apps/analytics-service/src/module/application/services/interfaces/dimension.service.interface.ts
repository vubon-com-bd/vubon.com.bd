/**
 * Dimension Service Interface
 * @module analytics-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services';
import type { DimensionEntity } from '../../../domain/entities/dimension.entity.js';

export interface IDimensionService extends BaseServiceInterface<DimensionEntity, string> {
  create(input: { name: string; description?: string }): Promise<DimensionEntity>;
  findByPayload(name: string): Promise<DimensionEntity | null>;
  listActive(): Promise<readonly DimensionEntity[]>;
  activate(id: string): Promise<void>;
  deactivate(id: string): Promise<void>;
}
