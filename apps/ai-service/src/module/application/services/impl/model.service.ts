import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ModelServiceInterface } from '../interfaces/model.service.interface';
import type { ModelRepository } from '../../../domain/repositories/model.repository.interface';
import type { ProviderRepository } from '../../../domain/repositories/provider.repository.interface';
import { ModelEntity } from '../../../domain/entities/model.entity';
import { ModelIdVO } from '../../../domain/value-objects/primitives/model-id.vo';
import { ModelNameVO } from '../../../domain/value-objects/primitives/model-name.vo';
import { ModelVersionVO } from '../../../domain/value-objects/primitives/model-version.vo';
import { ModelStatusVO } from '../../../domain/value-objects/primitives/model-status.vo';
import { ModelTypeVO } from '../../../domain/value-objects/primitives/model-type.vo';
import { ModelProviderIdVO } from '../../../domain/value-objects/primitives/model-provider-id.vo';
import { ProviderEndpointVO } from '../../../domain/value-objects/primitives/provider-endpoint.vo';
import { ModelEvaluationService } from '../../../domain/services/model-evaluation.service';
import {
  ModelNotFoundError,
  ModelNotDeployableError,
} from '../../errors/model.errors';
import type { CreateModelRequestDTO } from '../../dtos/requests/model/create-model.dto';
import type { UpdateModelRequestDTO } from '../../dtos/requests/model/update-model.dto';
import type { DeployModelRequestDTO } from '../../dtos/requests/model/deploy-model.dto';
import type { DeprecateModelRequestDTO } from '../../dtos/requests/model/deprecate-model.dto';
import type { TestModelRequestDTO } from '../../dtos/requests/model/test-model.dto';
import type { ModelResponseDTO } from '../../dtos/responses/model-response.dto';

@Injectable()
export class ModelService
  extends BaseService<ModelEntity, ModelIdVO>
  implements ModelServiceInterface
{
  readonly name = 'ModelService';

  constructor(
    private readonly modelRepo: ModelRepository,
    private readonly providerRepo: ProviderRepository,
    private readonly evaluationService: ModelEvaluationService,
  ) {
    super();
  }

  async create(input: CreateModelRequestDTO): Promise<ModelResponseDTO> {
    const name = ModelNameVO.create(input.name);
    const version = ModelVersionVO.create(input.version);
    const status = ModelStatusVO.create('draft');
    const type = ModelTypeVO.create(input.type);
    const providerId = ModelProviderIdVO.create(input.providerId);
    const endpoint = input.endpoint ? ProviderEndpointVO.create(input.endpoint) : null;

    const provider = await this.providerRepo.findById(providerId);
    if (!provider) {
      throw new ModelNotFoundError(`provider ${providerId.value}`);
    }

    const entity = ModelEntity.create({
      name,
      modelVersion: version,
      status,
      type,
      providerId,
      endpoint,
      description: input.description ?? null,
      metadata: null,
      metrics: null,
    });

    await this.modelRepo.save(entity);
    return this.toDTO(entity);
  }

  async update(modelId: string, input: UpdateModelRequestDTO): Promise<ModelResponseDTO> {
    const entity = await this.modelRepo.findById(ModelIdVO.create(modelId));
    if (!entity) throw new ModelNotFoundError(modelId);

    const updated = ModelEntity.reconstitute(
      entity.id,
      {
        name: input.name ? ModelNameVO.create(input.name) : entity.name,
        modelVersion: input.version ? ModelVersionVO.create(input.version) : entity.modelVersion,
        status: input.status ? ModelStatusVO.create(input.status) : entity.status,
        type: input.type ? ModelTypeVO.create(input.type) : entity.type,
        providerId: entity.providerId,
        endpoint: input.endpoint ? ProviderEndpointVO.create(input.endpoint) : entity.endpoint,
        description: input.description !== undefined ? input.description : entity.description,
        metadata: entity.metadata,
        metrics: entity.metrics,
      },
      entity.createdAt,
      new Date().toISOString(),
      entity.deletedAt ?? null,
    );

    await this.modelRepo.save(updated);
    return this.toDTO(updated);
  }

  async deploy(input: DeployModelRequestDTO): Promise<ModelResponseDTO> {
    const entity = await this.modelRepo.findById(ModelIdVO.create(input.modelId));
    if (!entity) throw new ModelNotFoundError(input.modelId);

    const evaluation = this.evaluationService.evaluate(entity);
    if (!evaluation.isProductionReady) {
      throw new ModelNotDeployableError(input.modelId, evaluation.reasons);
    }

    const deployed = entity.deploy();
    await this.modelRepo.save(deployed);
    return this.toDTO(deployed);
  }

  async deprecate(input: DeprecateModelRequestDTO): Promise<ModelResponseDTO> {
    const entity = await this.modelRepo.findById(ModelIdVO.create(input.modelId));
    if (!entity) throw new ModelNotFoundError(input.modelId);

    const deprecated = entity.deprecate();
    await this.modelRepo.save(deprecated);
    return this.toDTO(deprecated);
  }

  async test(input: TestModelRequestDTO): Promise<{ readonly passed: boolean; readonly results: readonly unknown[] }> {
    const entity = await this.modelRepo.findById(ModelIdVO.create(input.modelId));
    if (!entity) throw new ModelNotFoundError(input.modelId);

    const results = input.inputs.map((inp) => ({ input: inp, passed: true }));
    return { passed: results.every((r) => r.passed), results };
  }

  async findById(modelId: string): Promise<ModelEntity | null> {
    return this.modelRepo.findById(ModelIdVO.create(modelId));
  }

  private toDTO(entity: ModelEntity): ModelResponseDTO {
    return {
      id: entity.id.value,
      name: entity.name.value,
      version: entity.modelVersion.value,
      status: entity.status.value,
      type: entity.type.value,
      providerId: entity.providerId.value,
      endpoint: entity.endpoint?.value ?? null,
      description: entity.description,
    } as unknown as ModelResponseDTO;
  }
}
