import { z } from 'zod';

export const CreateCard = z.object({
  title: z
    .string({
      required_error: 'Title is required.',
      invalid_type_error: 'Title is required.',
    })
    .min(3, {
      message: 'A minimum of 3 characters required.',
    }),
  boardId: z.string(),
  listId: z.string(),
});
