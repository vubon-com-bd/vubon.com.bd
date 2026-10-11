/**
 * ITemplateService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  CreateTemplateRequestDTO,
  UpdateTemplateRequestDTO,
  RenderTemplateRequestDTO,
  PreviewTemplateRequestDTO,
  GetTemplateRequestDTO,
  GetTemplateBySlugRequestDTO,
  ListTemplatesRequestDTO,
  ActivateTemplateRequestDTO,
  DeactivateTemplateRequestDTO,
  DeprecateTemplateRequestDTO,
  ArchiveTemplateRequestDTO,
  CreateTemplateVersionRequestDTO,
} from '../../dtos/requests/template/index.js';
import type {
  TemplateResponseDTO,
  TemplatePublicResponseDTO,
  TemplateListResponseDTO,
  TemplateRenderResponseDTO,
  TemplatePreviewResponseDTO,
} from '../../dtos/responses/template-response.dto.js';

export const TEMPLATE_SERVICE = Symbol('TEMPLATE_SERVICE');

export interface ITemplateService {
  create(dto: CreateTemplateRequestDTO, actorId?: string): Promise<TemplateResponseDTO>;
  update(dto: UpdateTemplateRequestDTO, actorId?: string): Promise<TemplateResponseDTO>;
  activate(dto: ActivateTemplateRequestDTO, actorId?: string): Promise<TemplateResponseDTO>;
  deactivate(dto: DeactivateTemplateRequestDTO, actorId?: string): Promise<TemplateResponseDTO>;
  deprecate(dto: DeprecateTemplateRequestDTO, actorId?: string): Promise<TemplateResponseDTO>;
  archive(dto: ArchiveTemplateRequestDTO, actorId?: string): Promise<TemplateResponseDTO>;
  createVersion(dto: CreateTemplateVersionRequestDTO, actorId?: string): Promise<TemplateResponseDTO>;
  render(dto: RenderTemplateRequestDTO): Promise<TemplateRenderResponseDTO>;
  preview(dto: PreviewTemplateRequestDTO): Promise<TemplatePreviewResponseDTO>;
  getById(dto: GetTemplateRequestDTO): Promise<TemplateResponseDTO>;
  getPublic(dto: GetTemplateRequestDTO): Promise<TemplatePublicResponseDTO>;
  getBySlug(dto: GetTemplateBySlugRequestDTO): Promise<TemplateResponseDTO>;
  list(dto: ListTemplatesRequestDTO): Promise<TemplateListResponseDTO>;
}
