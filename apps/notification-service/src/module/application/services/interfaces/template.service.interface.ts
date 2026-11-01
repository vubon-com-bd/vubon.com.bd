/**
 * ITemplateService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  CreateTemplateRequestDTO,
  UpdateTemplateRequestDTO,
  TestTemplateRequestDTO,
} from '@application/dtos/requests/template/index.js';
import type {
  TemplateResponseDTO,
  TemplateSummaryResponseDTO,
  TemplateListResponseDTO,
  TemplateRenderResponseDTO,
} from '@application/dtos/responses/template-response.dto.js';

export const TEMPLATE_SERVICE = Symbol('TEMPLATE_SERVICE');

export interface TemplateListFilterDTO {
  readonly type?: string;
  readonly status?: string;
  readonly category?: string;
  readonly format?: string;
  readonly locale?: string;
  readonly search?: string;
}

export interface TemplateListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'name' | 'version';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: TemplateListFilterDTO;
}

export interface ITemplateService {
  // Commands
  create(
    dto: CreateTemplateRequestDTO,
    actorId?: string,
  ): Promise<TemplateResponseDTO>;

  update(
    dto: UpdateTemplateRequestDTO,
    actorId?: string,
  ): Promise<TemplateResponseDTO>;

  test(
    dto: TestTemplateRequestDTO,
    actorId?: string,
  ): Promise<TemplateRenderResponseDTO>;

  // Queries
  getById(id: string): Promise<TemplateResponseDTO>;
  getBySlug(slug: string): Promise<TemplateResponseDTO>;
  list(options: TemplateListOptionsDTO): Promise<TemplateListResponseDTO>;
}
