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
