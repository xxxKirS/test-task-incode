import { z } from 'zod';

export const createBoardSchema = z.object({
  name: z.string().min(1, 'This field is required'),
});

export const createCardSchema = z.object({
  name: z.string().min(1, 'This field is required'),
  description: z.string().optional(),
});

export type CreateBoardSchema = z.infer<typeof createBoardSchema>;
export type CreateCardSchema = z.infer<typeof createCardSchema>;
