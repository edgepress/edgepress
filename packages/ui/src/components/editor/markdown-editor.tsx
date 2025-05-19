import { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import 'bytemd/dist/index.css';

import gfm from '@bytemd/plugin-gfm'
import { Editor, Viewer } from '@bytemd/react'
import zhTw from '@edgepress/ui/components/bytemd/locales/zh_TW.json'
const plugins = [
  gfm(),
  // Add more plugins here
];

const initialMarkdown = `# Hi, *Pluto*!
Text here. [^1]
Text here. [^2]

[^1]: note 1 
[^2]: note 2
`;

export default function MarkdownEditor() {
  const [markdownContent, setMarkdownContent] = useState(initialMarkdown);

  return (
    <div className='h-full [&>div]:h-full'>
      <Editor
        mode='split'
        locale={zhTw}
        placeholder='Enter Markdown text here...'
        value={markdownContent}
        plugins={plugins}
        onChange={(v) => {
          setMarkdownContent(v);
        }}
      />
    </div>
  );
}
