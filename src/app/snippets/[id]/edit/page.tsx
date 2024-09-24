import MonacoEditor from '@/components/MonacoEditor';
import { db } from '@/db';
import GeneralButton from '@/components/GeneralButton';
import { notFound } from 'next/navigation';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

export default async function EditSnippet(props: Props) {
  //Get the snippet
  const snippet = await db.snippet.findFirst({
    where: { id: Number(props.params.id) },
  });

  if (!snippet) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl mb-10">{snippet.title}</h1>
      <div>
        <MonacoEditor snippet={snippet} />
      </div>
      <div className="flex justify-end">
        <GeneralButton href={`/snippets/${snippet.id}`} text="Go Back" />
      </div>
    </div>
  );
}
