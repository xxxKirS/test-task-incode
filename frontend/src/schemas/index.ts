import { z } from 'zod';

export const createBoardSchema = z.object({
  name: z.string().min(1, 'This field is required'),
});

export const updateBoardSchema = z.object({
  name: z.string().min(1, 'This field is required'),
});

export type CreateBoardSchema = z.infer<typeof createBoardSchema>;
export type UpdateBoardSchema = z.infer<typeof updateBoardSchema>;
