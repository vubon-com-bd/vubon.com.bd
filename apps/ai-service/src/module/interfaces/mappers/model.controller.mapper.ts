import { ModelResponseDTO } from '../dtos/responses/model.response.dto';

export interface AppModelDTO {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly type: string;
  readonly status: string;
  readonly providerId: string;
  readonly endpoint: string | null;
  readonly description: string | null;
}

export class ModelControllerMapper {
  static toResponse(dto: AppModelDTO): ModelResponseDTO {
    return {
      id: dto.id,
      name: dto.name,
      version: dto.version,
      type: dto.type,
      status: dto.status,
      providerId: dto.providerId,
      endpoint: dto.endpoint,
      description: dto.description,
    };
  }
}
