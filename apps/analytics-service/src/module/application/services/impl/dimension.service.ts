/**
 * Dimension Service Implementation
 */
import { BaseService } from '@vubon/shared-kernel/application/services';
import { ApplicationValidationError, ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import type { DimensionEntity } from '../../../domain/entities/dimension.entity.js';
import { DimensionEntity as DimensionEntityClass } from '../../../domain/entities/dimension.entity.js';
import type { DimensionRepository } from '../../../domain/repositories/dimension.repository.interface.js';
import { DimensionIdVO } from '../../../domain/value-objects/primitives/dimension-id.vo.js';
import { DimensionNameVO } from '../../../domain/value-objects/primitives/dimension-name.vo.js';
import type { IDimensionService } from '../interfaces/dimension.service.interface.js';

export class DimensionService extends BaseService<DimensionEntity, string> implements IDimensionService {
  readonly name = 'DimensionService';

  constructor(private readonly repository: DimensionRepository) {
    super();
  }

  async create(input: { name: string; description?: string }): Promise<DimensionEntity> {
    const now = new Date().toISOString();
    const nameVO = DimensionNameVO.custom(input.name);

    const existing = await this.repository.findByName(nameVO);
    if (existing) {
      throw new ApplicationValidationError(`Dimension "${input.name}" already exists`, 'name');
    }

    const entity = DimensionEntityClass.create({
      id: DimensionIdVO.create(input.name.toLowerCase().replace(/\s+/g, '_')),
      name: nameVO,
      description: input.description,
      now,
    });

    return this.repository.save(entity);
  }

  async findByPayload(name: string): Promise<DimensionEntity | null> {
    const nameVO = name.includes(':') ? DimensionNameVO.create(name) : DimensionNameVO.custom(name);
    return this.repository.findByName(nameVO);
  }

  async listActive(): Promise<readonly DimensionEntity[]> {
    return this.repository.findAllActive();
  }

  async activate(id: string): Promise<void> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new ApplicationNotFoundError('Dimension', id);
    entity.activate();
    await this.repository.save(entity);
  }

  async deactivate(id: string): Promise<void> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new ApplicationNotFoundError('Dimension', id);
    entity.deactivate();
    await this.repository.save(entity);
  }
}
