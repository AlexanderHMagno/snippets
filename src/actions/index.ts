//To indicate these are server actions to mutate data
'use server';

import { db } from '@/db';
import { redirect } from 'next/navigation';

export async function patchSnippet(id: number, title: string, code: string) {
  const saved = await db.snippet.update({
    where: { id },
    data: { code, title },
  });

  if (saved) {
    redirect(`/snippets/${id}`);
  }
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({ where: { id } });

  redirect('/');
}

export async function createNewSnippet(formState: any, formData: FormData) {
  //Check Users input
  const title = formData.get('title');
  const code = formData.get('code');

  //Validation
  if (typeof title !== 'string' || title.length < 3) {
    return { message: 'Please enter a valid title' };
  }

  if (typeof code !== 'string' || code.length < 10) {
    return { message: 'Please enter a valid code' };
  }

  //Create new entry
  if (title && code) {
    await db.snippet.create({ data: { title, code } });
    redirect('/');
  }
}
