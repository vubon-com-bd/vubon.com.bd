import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ModelEntity } from '../../../domain/entities/model.entity';
import type { ModelIdVO } from '../../../domain/value-objects/primitives/model-id.vo';
import type { CreateModelRequestDTO } from '../../dtos/requests/model/create-model.dto';
import type { UpdateModelRequestDTO } from '../../dtos/requests/model/update-model.dto';
import type { DeployModelRequestDTO } from '../../dtos/requests/model/deploy-model.dto';
import type { DeprecateModelRequestDTO } from '../../dtos/requests/model/deprecate-model.dto';
import type { TestModelRequestDTO } from '../../dtos/requests/model/test-model.dto';
import type { ModelResponseDTO } from '../../dtos/responses/model-response.dto';

export interface ModelServiceInterface
  extends BaseServiceInterface<ModelEntity, ModelIdVO> {
  create(input: CreateModelRequestDTO): Promise<ModelResponseDTO>;
  update(modelId: string, input: UpdateModelRequestDTO): Promise<ModelResponseDTO>;
  deploy(input: DeployModelRequestDTO): Promise<ModelResponseDTO>;
  deprecate(input: DeprecateModelRequestDTO): Promise<ModelResponseDTO>;
  test(input: TestModelRequestDTO): Promise<{ readonly passed: boolean; readonly results: readonly unknown[] }>;
  findById(modelId: string): Promise<ModelEntity | null>;
}
