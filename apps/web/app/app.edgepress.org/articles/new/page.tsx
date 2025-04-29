import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Save } from 'lucide-react';

export default function NewArticlePage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Button asChild variant='ghost' size='sm' className='gap-1'>
            <Link href='/app.edgepress.org/articles'>
              <ChevronLeft className='h-4 w-4' />
              Back
            </Link>
          </Button>
          <h1 className='text-2xl font-bold'>New Article</h1>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline'>Save as Draft</Button>
          <Button>
            <Save className='mr-2 h-4 w-4' />
            Publish
          </Button>
        </div>
      </div>

      <div className='grid gap-4'>
        <div>
          <input
            type='text'
            className='w-full text-4xl font-bold border-none bg-transparent focus:outline-none focus:ring-0 p-0'
            placeholder='Article Title'
          />
        </div>
        <div>
          <textarea
            className='w-full min-h-[200px] text-lg border-none bg-transparent focus:outline-none focus:ring-0 p-0 resize-none'
            placeholder='Write your article content here...'
          />
        </div>
      </div>
    </div>
  );
}
