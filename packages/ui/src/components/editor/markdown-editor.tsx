import { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

const initialMarkdown = `# Hi, *Pluto*!
Text here. [^1]
Text here. [^2]

[^1]: note 1 
[^2]: note 2
`;

export default function MarkdownEditor() {
  const [markdownContent, setMarkdownContent] = useState(initialMarkdown);

  return (
    <div className='grid grid-cols-2 h-full'>
      <div className='border-r p-4'>
        <textarea
          className='w-full h-full p-2 font-mono text-sm bg-muted/50 resize-none focus:outline-none'
          value={markdownContent}
          onChange={(e) => setMarkdownContent(e.target.value)}
          aria-label='Markdown Editor'
          placeholder='Enter Markdown text here...'
        />
      </div>
      <div className='p-4 overflow-auto'>
        <Markdown
          remarkPlugins={[remarkGfm, remarkMath]}
          remarkRehypeOptions={{
            footnoteLabel: 'Sources',
          }}
        >
          {markdownContent}
        </Markdown>
      </div>
    </div>
  );
}
