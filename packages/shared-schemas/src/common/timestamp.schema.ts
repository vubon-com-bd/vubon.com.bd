import { z } from 'zod';

export const TimestampSchema = z.object({
  timestamp: z.date().or(z.number().int().positive()).or(z.string().datetime()),
});

export const UnixTimestampSchema = z.number().int().positive();

export const ISOTimestampSchema = z.string().datetime();
