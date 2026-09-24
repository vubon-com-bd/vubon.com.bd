import { z } from 'zod';
import {
  CreateTemplateSchema,
  UpdateTemplateSchema,
  TestTemplateSchema,
} from '../../../application/dtos/requests/template';

export const TemplateCreateRequestSchema = CreateTemplateSchema;
export const TemplateUpdateRequestSchema = UpdateTemplateSchema;
export const TemplateTestRequestSchema = TestTemplateSchema;

export type TemplateCreateRequestDTO = z.infer<typeof TemplateCreateRequestSchema>;
export type TemplateUpdateRequestDTO = z.infer<typeof TemplateUpdateRequestSchema>;
export type TemplateTestRequestDTO = z.infer<typeof TemplateTestRequestSchema>;
