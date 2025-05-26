"use client";

import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { Block } from '@blocknote/core';

export type { Block };

export default function TextEditor({
  content,
  onContentChange,
}: {
  onContentChange: (content: Block[]) => void;
  content?: Block[];
}) {
  const editor = useCreateBlockNote({
    initialContent:
      content && content.length > 0
        ? content
        : [{type: 'paragraph', content: ''}],
  });

  return (
    <BlockNoteView
      editor={editor}
      onChange={() => onContentChange(editor.document)}
      theme={'light'}
    />
  );
}
