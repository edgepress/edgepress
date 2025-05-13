'use client';

import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Editor, EditorContainer } from '@edgepress/ui/components/plate-ui/editor';
import { Plate } from '@udecode/plate/react';

import { SettingsDialog } from '@edgepress/ui/components/editor/settings';
import { useCreateEditor } from '@edgepress/ui/components/editor/use-create-editor';

export function PlateEditor() {
  const editor = useCreateEditor();

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor}>
        <EditorContainer>
          <Editor />
        </EditorContainer>

        <SettingsDialog />
      </Plate>
    </DndProvider>
  );
}
