"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { type Block } from "@blocknote/core";

interface PostEditorProps {
  initialContent?: Block[];
  onChange?: (content: Block[]) => void;
}

export function PostEditor({ initialContent, onChange }: PostEditorProps) {
  const editor = useCreateBlockNote({
    initialContent,
  });

  useEffect(() => {
    if (!onChange) return;
    
    const unsubscribe = editor.onChange(() => {
      onChange(editor.document);
    });
    
    return unsubscribe;
  }, [editor, onChange]);

  return (
    <div className="rounded-md overflow-hidden bg-background">
      <BlockNoteView
        editor={editor}
        theme="light"
        className="min-h-[400px] prose max-w-none"
      />
    </div>
  );
}

export const DynamicPostEditor = dynamic(
  () => Promise.resolve(PostEditor),
  { ssr: false }
); 
