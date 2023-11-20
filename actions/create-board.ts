'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { db } from '@/lib/db';

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

const CreateBord = z.object({
  title: z.string().min(3, {
    message: 'A minimum of 3 characters is required.',
  }),
});

export async function create(prevState: State, formData: FormData) {
  const validatedFields = CreateBord.safeParse({
    title: formData.get('title'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Field validation failed > Missing fields.',
    };
  }

  const { title } = validatedFields.data;

  try {
    await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      message: 'Database error',
    };
  }

  revalidatePath('/organization/org_2YDRr3YviBNHmP2ZRhHV7NyTunP');
  redirect('/organization/org_2YDRr3YviBNHmP2ZRhHV7NyTunP');
}
