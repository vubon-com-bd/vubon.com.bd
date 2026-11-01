/**
 * ITemplateVariableService — contract
 * @module notification-service/application/services/interfaces
 */
export const TEMPLATE_VARIABLE_SERVICE = Symbol('TEMPLATE_VARIABLE_SERVICE');

export interface TemplateVariableResponseDTO {
  readonly id: string;
  readonly templateId: string;
  readonly name: string;
  readonly type: string;
  readonly required: boolean;
  readonly defaultValue?: string;
  readonly description?: string;
  readonly usageCount: number;
}

export interface ITemplateVariableService {
  listByTemplate(templateId: string): Promise<readonly TemplateVariableResponseDTO[]>;
  listRequired(templateId: string): Promise<readonly TemplateVariableResponseDTO[]>;
  getByName(templateId: string, name: string): Promise<TemplateVariableResponseDTO | null>;
}
