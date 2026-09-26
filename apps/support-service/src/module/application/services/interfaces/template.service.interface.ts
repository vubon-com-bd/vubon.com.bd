/**
 * TemplateServiceInterface
 * @module support-service/application/services/interfaces
 */
import type { CreateTemplateRequestDTO } from '../../dtos/requests/template/create-template.dto';
import type { UpdateTemplateRequestDTO } from '../../dtos/requests/template/update-template.dto';
import type { TemplateResponseDTO } from '../../dtos/responses/template-response.dto';

export interface TemplateServiceInterface {
  create(input: CreateTemplateRequestDTO): Promise<TemplateResponseDTO>;
  update(input: UpdateTemplateRequestDTO): Promise<TemplateResponseDTO>;
  getById(templateId: string): Promise<TemplateResponseDTO>;
  list(page: number, limit: number): Promise<readonly TemplateResponseDTO[]>;
  render(
    templateId: string,
    values: Readonly<Record<string, string | number>>,
  ): Promise<string>;
}
