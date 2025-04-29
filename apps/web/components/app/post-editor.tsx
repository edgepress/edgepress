"use client";

import { useState } from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

interface PostEditorProps {
  initialContent?: object;
  onChange?: (content: object) => void;
}

export function PostEditor({ initialContent, onChange }: PostEditorProps) {
  // 創建編輯器實例
  const editor = useCreateBlockNote({
    initialContent: initialContent as any,
  });

  // 當內容變更時觸發回調
  editor.onEditorContentChange(() => {
    if (onChange) {
      editor.blocksToJSON().then((blocks) => {
        onChange(blocks);
      });
    }
  });

  return (
    <div className="border rounded-md overflow-hidden bg-background">
      <BlockNoteView
        editor={editor}
        theme="light"
        className="min-h-[400px] prose max-w-none"
      />
    </div>
  );
}

// 使用動態導入來解決 SSR 問題
import dynamic from "next/dynamic";

export const DynamicPostEditor = dynamic(
  () => Promise.resolve(PostEditor),
  { ssr: false }
); 
