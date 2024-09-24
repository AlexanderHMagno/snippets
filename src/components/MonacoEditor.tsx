'use client';
import type { Snippet } from '@prisma/client';

import Editor from '@monaco-editor/react';
import { useState } from 'react';

type MonacoProps = {
  snippet: Snippet;
  readOnly?: boolean;
  width?: string;
};

const MonacoEditor = ({ snippet, readOnly, width = '60vw' }: MonacoProps) => {
  const [codigo, setCodigo] = useState(snippet.code);
  function handleEditorChange(value: string = '') {
    setCodigo(value);
  }

  return (
    <div>
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
      />{' '}
    </div>
  );
};

export default MonacoEditor;
