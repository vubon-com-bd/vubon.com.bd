import { z } from 'zod';
import type { ReportEntity } from '../../../domain/entities/report.entity';

export const ReportResponseSchema = z.object({
  reportId: z.string(),
  type: z.string(),
  format: z.string(),
  status: z.string(),
  frequency: z.string().nullable(),
  ownerId: z.string(),
  generatedAt: z.string().datetime().nullable(),
  nextRunAt: z.string().datetime().nullable(),
  isReady: z.boolean(),
  createdAt: z.string().datetime(),
});

export type ReportResponseDTO = z.infer<typeof ReportResponseSchema>;

export function toReportResponse(entity: ReportEntity): ReportResponseDTO {
  return {
    reportId: entity.id.value,
    type: entity.type.value,
    format: entity.format.value,
    status: entity.status.value,
    frequency: entity.frequency?.value ?? null,
    ownerId: entity.ownerId,
    generatedAt: entity.generatedAt?.toISOString() ?? null,
    nextRunAt: entity.nextRunAt?.toISOString() ?? null,
    isReady: entity.isReady,
    createdAt: entity.createdAt,
  };
}
