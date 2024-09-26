'use client';
import type { Snippet } from '@prisma/client';
import * as actions from '@/actions';

import Editor from '@monaco-editor/react';
import { useState } from 'react';
import GeneralButton from './GeneralButton';

type MonacoProps = {
  snippet: Snippet;
  readOnly?: boolean;
  width?: string;
};

const MonacoEditor = ({ snippet, readOnly, width = '60vw' }: MonacoProps) => {
  const [codigo, setCodigo] = useState(snippet.code);
  const [title, setTitle] = useState(snippet.title);
  function handleEditorChange(value: string = '') {
    setCodigo(value);
  }

  const editSnippet = actions.patchSnippet.bind(
    null,
    snippet.id,
    title,
    codigo
  );

  return (
    <div>
      {readOnly ? (
        <h1 className="text-3xl mb-10">{title}</h1>
      ) : (
        <input
          type="text"
          className="w-full mb-10 h-10 p-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      )}

      <Editor
        height="40vh"
        defaultLanguage="typescript"
        defaultValue={codigo}
        width={width}
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          padding: { top: 20 },
          readOnly: readOnly,
        }}
      />

      {!readOnly && (
        <form action={editSnippet} className="flex justify-end pt-10 space-x-4">
          <GeneralButton href={`/snippets/${snippet.id}`} text="Go Back" />
          <button className="bg-orange-500 text-white px-4  py-2 rounded hover:bg-blue-600 focus:outline-none  focus:ring-blue-500 right-0">
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default MonacoEditor;
