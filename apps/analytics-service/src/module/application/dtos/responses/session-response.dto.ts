import { z } from 'zod';
import type { SessionEntity } from '../../../domain/entities/session.entity';

export const SessionResponseSchema = z.object({
  sessionId: z.string(),
  userId: z.string().nullable(),
  entryPage: z.string(),
  exitPage: z.string(),
  pageViewCount: z.number().int().nonnegative(),
  durationSeconds: z.number().nullable(),
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime().nullable(),
  isActive: z.boolean(),
  isBounce: z.boolean(),
  isAnonymous: z.boolean(),
});

export type SessionResponseDTO = z.infer<typeof SessionResponseSchema>;

export function toSessionResponse(entity: SessionEntity): SessionResponseDTO {
  const duration = entity.getDuration();
  return {
    sessionId: entity.id.value,
    userId: entity.userId?.value ?? null,
    entryPage: entity.entryPage.value,
    exitPage: entity.exitPage.value,
    pageViewCount: entity.pageViewCount,
    durationSeconds: duration?.seconds ?? null,
    startedAt: entity.startedAt.toISOString(),
    endedAt: entity.endedAt?.toISOString() ?? null,
    isActive: entity.isActive,
    isBounce: entity.isBounce,
    isAnonymous: entity.userId === null,
  };
}
