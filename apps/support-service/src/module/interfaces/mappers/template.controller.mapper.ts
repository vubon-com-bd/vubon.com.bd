/**
 * TemplateControllerMapper
 * @module support-service/interfaces/mappers
 */
import { Injectable } from '@nestjs/common';
import type { TemplateResponseDTO as AppTemplateResponseDTO } from '../../application/dtos/responses/template-response.dto';
import { TemplateResponseDTO } from '../dtos/responses/template-response.dto';

@Injectable()
export class TemplateControllerMapper {
  toResponse(app: AppTemplateResponseDTO): TemplateResponseDTO {
    const res = new TemplateResponseDTO();
    res.id = app.id;
    res.name = app.name;
    res.slug = app.slug;
    res.type = app.type;
    res.status = app.status;
    res.locale = app.locale;
    res.subject = app.subject;
    res.body = app.body;
    res.variables = app.variables.map((v) => ({
      name: v.name,
      type: v.type,
      required: v.required,
      defaultValue: v.defaultValue,
      description: v.description,
    }));
    res.version = app.version;
    res.createdBy = app.createdBy;
    res.updatedBy = app.updatedBy;
    res.createdAt = app.createdAt;
    res.updatedAt = app.updatedAt;
    return res;
  }
}
