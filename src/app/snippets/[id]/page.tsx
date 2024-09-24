import GeneralButton from '@/components/GeneralButton';
import MonacoEditor from '@/components/MonacoEditor';
import { db } from '@/db';
import Link from 'next/link';
import React from 'react';
import type { Snippet } from '@prisma/client';

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 w-full">
      <title>{data?.title}</title>
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{data?.title}</h1>
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <MonacoEditor snippet={data} readOnly={true} width="100%" />

        <div className="flex space-x-4 mb-4">
          <Link
            href={`${data?.id}/edit`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Edit
          </Link>
          <Link
            href="/delete"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </Link>
        </div>
      </div>
      <GeneralButton href="/" text="Go back" />
    </div>
  );
};

export default SingleSnippetPage;
