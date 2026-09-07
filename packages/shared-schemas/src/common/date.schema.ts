import { z } from 'zod';

export const DateSchema = z.object({
  date: z.date().or(z.string().datetime()),
});

export const DateStringSchema = z.string().datetime('Invalid date format');

export const DateRangeSchema = z
  .object({
    startDate: z.date().or(z.string().datetime()),
    endDate: z.date().or(z.string().datetime()),
  })
  .refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
    message: 'Start date must be before end date',
  });
