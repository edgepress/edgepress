"use client";

import dynamic from 'next/dynamic';
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useEffect, useState, useCallback } from 'react';
import { type Block, type Dictionary } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

const SUPPORTED_LOCALES = {
  EN: 'en',
  ZH_TW: 'zh-TW',
  ZH: 'zh',
  JA: 'ja',
  KO: 'ko',
  NL: 'nl',
} as const;

type SupportedLocale = typeof SUPPORTED_LOCALES[keyof typeof SUPPORTED_LOCALES];

interface PostEditorProps {
  initialContent?: Block[];
  onChange?: (content: Block[]) => void;
  dictionary?: Dictionary;
  className?: string;
}

export function PostEditor({ 
  initialContent, 
  onChange, 
  dictionary,
  className = ''
}: PostEditorProps) {
  const editor = useCreateBlockNote({
    initialContent,
    dictionary,
  });

  useEffect(() => {
    if (!onChange) return;
    
    const unsubscribe = editor.onChange(() => {
      onChange(editor.document);
    });
    
    return unsubscribe;
  }, [editor, onChange]);

  return (
    <div className={`rounded-md overflow-hidden bg-background ${className}`}>
      <BlockNoteView
        editor={editor}
        theme="light"
        className="min-h-[400px] prose max-w-none"
      />
    </div>
  );
}

export function useLoadDictionary(locale: SupportedLocale = SUPPORTED_LOCALES.EN) {
  const [state, setState] = useState<{
    dictionary: Dictionary | null;
    isLoading: boolean;
    error: Error | null;
  }>({
    dictionary: null,
    isLoading: true,
    error: null
  });

  const loadLocale = useCallback(async (localeCode: SupportedLocale) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      let dictionary: Dictionary | null = null;
      
      switch (localeCode) {
        case SUPPORTED_LOCALES.ZH:
        case SUPPORTED_LOCALES.ZH_TW:
          const { zh } = await import("@blocknote/core/locales");
          dictionary = zh;
          break;
        case SUPPORTED_LOCALES.JA:
          const { ja } = await import("@blocknote/core/locales");
          dictionary = ja;
          break;
        case SUPPORTED_LOCALES.KO:
          const { ko } = await import("@blocknote/core/locales");
          dictionary = ko;
          break;
        case SUPPORTED_LOCALES.NL:
          const { nl } = await import("@blocknote/core/locales");
          dictionary = nl;
          break;
        case SUPPORTED_LOCALES.EN:
        default:
          dictionary = null;
      }
      
      setState({
        dictionary,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error(`Failed to load locale '${localeCode}':`, error);
      setState({
        dictionary: null,
        isLoading: false,
        error: error instanceof Error ? error : new Error(String(error))
      });
    }
  }, []);

  useEffect(() => {
    loadLocale(locale);
  }, [locale, loadLocale]);

  return state;
}

interface PostEditorWithLocaleProps {
  initialContent?: Block[];
  onChange?: (content: Block[]) => void;
  locale?: SupportedLocale;
  className?: string;
  loadingComponent?: React.ReactNode;
  errorComponent?: (error: Error) => React.ReactNode;
}

export function PostEditorWithLocale({ 
  initialContent, 
  onChange, 
  locale = SUPPORTED_LOCALES.EN,
  className,
  loadingComponent,
  errorComponent
}: PostEditorWithLocaleProps) {
  const { dictionary, isLoading, error } = useLoadDictionary(locale);

  if (isLoading) {
    return loadingComponent || (
      <div className="min-h-[400px] flex items-center justify-center">
        Loading editor...
      </div>
    );
  }

  if (error) {
    return errorComponent?.(error) || (
      <div className="min-h-[400px] flex items-center justify-center text-red-500">
        Error loading editor: {error.message}
      </div>
    );
  }

  return (
    <PostEditor 
      initialContent={initialContent} 
      onChange={onChange} 
      dictionary={dictionary || undefined}
      className={className}
    />
  );
}

export const DynamicPostEditor = dynamic(
  () => Promise.resolve(PostEditorWithLocale),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-[400px] flex items-center justify-center">
        Loading editor...
      </div>
    ) 
  }
); 
