import GeneralButton from '@/components/GeneralButton';
import MonacoEditor from '@/components/MonacoEditor';
import { db } from '@/db';
import React from 'react';
import type { Snippet } from '@prisma/client';
import * as action from '@/actions';

type Props = {
  params: {
    id: string;
  };
};

const SingleSnippetPage = async (props: Props) => {
  const { id } = props.params;
  const data = (await db.snippet.findFirst({
    where: { id: Number(id) },
  })) as Snippet;

  const deleteSnippetAction = action.deleteSnippet.bind(null, Number(id));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 w-full">
      <title>{data?.title}</title>
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <MonacoEditor snippet={data} readOnly={true} width="100%" />

        <div className="flex space-x-4 mb-4 justify-end pt-10">
          <GeneralButton href="/" text="Go back" />
          <GeneralButton href={`${data?.id}/edit`} text="Edit" />

          <form action={deleteSnippetAction}>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleSnippetPage;

export async function generateStaticParams() {
  const snippets = await action.getAllSnippets();

  return snippets.map((snippet) => ({
    id: snippet.id.toString(),
  }));
}
