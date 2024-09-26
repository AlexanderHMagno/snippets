import MonacoEditor from '@/components/MonacoEditor';
import { db } from '@/db';
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
      <div>
        <MonacoEditor snippet={snippet} />
      </div>
    </div>
  );
}
