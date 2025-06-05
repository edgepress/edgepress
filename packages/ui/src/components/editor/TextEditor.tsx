"use client";

import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { Block } from '@blocknote/core';
import { useEffect, useState } from 'react';

export type { Block };

export default function TextEditor({
  content,
  onContentChange,
}: {
  onContentChange: (content: Block[]) => void;
  content?: Block[];
}) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useCreateBlockNote({
    initialContent:
      content && content.length > 0
        ? content
        : [{type: 'paragraph', content: ''}],
  });

  // Prevent server-side rendering
  if (!isMounted) {
    return <div className="min-h-[200px] bg-gray-50 animate-pulse rounded-md" />;
  }

  return (
    <BlockNoteView
      editor={editor}
      onChange={() => onContentChange(editor.document)}
      theme={'light'}
    />
  );
}
