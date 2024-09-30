//To indicate these are server actions to mutate data
'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { redirect } from 'next/navigation';

export async function patchSnippet(id: number, title: string, code: string) {
  const saved = await db.snippet.update({
    where: { id },
    data: { code, title },
  });

  if (saved) {
    revalidatePath(`/snippets/${id}`);
    redirect(`/snippets/${id}`);
  }
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({ where: { id } });
  revalidatePath('/');
  redirect('/');
}

interface formState {
  message: string;
}

export async function createNewSnippet(state: formState, formData: FormData) {
  // Default state if undefined
  const currentState = state || { message: 'Something Went Wrong' };

  // Check Users input
  const title = formData.get('title');
  const code = formData.get('code');

  // Validation
  if (typeof title !== 'string' || title.length < 3) {
    return { message: 'Please enter a valid title' };
  }

  if (typeof code !== 'string' || code.length < 10) {
    return { message: 'Please enter a valid code' };
  }

  //If there is something wrong with the creation process we have to send this
  //information back
  try {
    await db.snippet.create({ data: { title, code } });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return currentState;
    }
  }
  revalidatePath('/');
  redirect('/');
}

export async function getAllSnippets() {
  return await db.snippet.findMany();
}
