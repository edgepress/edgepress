"use client";

import { Suspense, useState } from "react";
import React from "react";

import { Button } from "@edgepress/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@edgepress/ui/components/dialog";
import MarkdownEditor from "@edgepress/ui/components/editor/markdown-editor";
import TextEditor from "@edgepress/ui/components/editor/TextEditor";
import { ScrollArea } from "@edgepress/ui/components/scroll-area";
import { 
  CheckSquare,
  ChevronLeft, 
  Clock, 
  Image, 
  Save, 
  Settings, 
  Tag 
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Toaster } from "sonner";

const categories = [
  { label: "Technology", value: "technology" },
  { label: "Web Development", value: "web-development" },
  { label: "AI & Machine Learning", value: "ai-machine-learning" },
  { label: "UX/UI Design", value: "ux-ui-design" },
  { label: "Productivity", value: "productivity" },
];

// Client component that uses useSearchParams
function EditorWithParams({ content, onContentChange }: { onContentChange: (content: object) => void; content?: object, }) {
  const searchParams = useSearchParams();
  const flag = searchParams.get('flag');

  return (
    <div className='w-full h-[calc(100vh-170px)]'>
      {flag === 'markdown' ? (
        <MarkdownEditor />
      ) : (
        <TextEditor onContentChange={onContentChange} content={content} />
      )}
      <Toaster />
    </div>
  );
}

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<object>();
  const [publishing, setPublishing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [category, setCategory] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSaveDraft = async () => {
    if (!title) {
      alert("Please enter a title for your post");
      return;
    }

    setSaving(true);
    
    try {
      console.log("Saving draft...", { category, content, title });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert("Draft saved successfully!");
    } catch (error) {
      console.error("Error saving draft:", error);
      alert("Failed to save draft. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!title) {
      alert("Please enter a title for your post");
      return;
    }

    setPublishing(true);
    
    try {
      console.log("Publishing post...", { category, content, title });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert("Post published successfully!");
    } catch (error) {
      console.error("Error publishing post:", error);
      alert("Failed to publish post. Please try again.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Button asChild size='sm' variant='ghost' className='gap-1'>
            <Link href='/posts'>
              <ChevronLeft className='h-4 w-4' />
              Back
            </Link>
          </Button>
          <h1 className='text-2xl font-bold'>New Post</h1>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            disabled={saving || publishing}
            onClick={handleSaveDraft}
          >
            {saving ? 'Saving...' : 'Save as Draft'}
          </Button>
          <Button
            size='icon'
            variant='outline'
            className='h-9 w-9'
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings className='h-4 w-4' />
            <span className='sr-only'>Post Settings</span>
          </Button>
          <Button disabled={saving || publishing} onClick={handlePublish}>
            <Save className='mr-2 h-4 w-4' />
            {publishing ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>

      <div className='space-y-4'>
        <div className='w-full'>
          <input
            className='w-full text-4xl font-bold border-none bg-transparent focus:outline-none focus:ring-0 p-0'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Post Title'
            type='text'
          />
        </div>

        <Suspense fallback={<div>Loading editor...</div>}>
          <EditorWithParams onContentChange={setContent} content={content} />
          
        </Suspense>
      </div>

      {/* Post Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>Post Settings</DialogTitle>
            <DialogDescription>
              Configure post details and publishing options
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className='max-h-[70vh]'>
            <div className='p-2 space-y-6'>
              <div>
                <h3 className='font-medium mb-2 flex items-center gap-2'>
                  <Tag className='h-4 w-4' />
                  Category
                </h3>
                <div className='space-y-2'>
                  {categories.map((cat) => (
                    <div key={cat.value} className='flex items-center gap-2'>
                      <div
                        className='w-4 h-4 border rounded-sm grid place-items-center cursor-pointer'
                        onClick={() => setCategory(cat.value)}
                      >
                        {cat.value === category && (
                          <CheckSquare className='text-primary w-4 h-4' />
                        )}
                      </div>
                      <span className='text-sm'>{cat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className='font-medium mb-2 flex items-center gap-2'>
                  <Image className='h-4 w-4' />
                  Featured Image
                </h3>
                <div className='flex items-center justify-center border border-dashed rounded-md h-32 bg-muted/20'>
                  <Button
                    size='sm'
                    variant='ghost'
                    className='flex flex-col gap-1 h-auto py-3'
                  >
                    <Image className='h-5 w-5' />
                    <span className='text-xs'>Upload Image</span>
                  </Button>
                </div>
              </div>

              <div>
                <h3 className='font-medium mb-2 flex items-center gap-2'>
                  <Clock className='h-4 w-4' />
                  Publication
                </h3>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Clock className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm'>Publish immediately</span>
                  </div>
                  <Button size='sm' variant='outline' className='w-full'>
                    Schedule publication
                  </Button>
                </div>
              </div>

              <div>
                <h3 className='font-medium mb-2 flex items-center gap-2'>
                  Advanced Settings
                </h3>
                <div className='space-y-2'>
                  <div className='grid grid-cols-2 gap-2'>
                    <Button size='sm' variant='outline'>
                      SEO Settings
                    </Button>
                    <Button size='sm' variant='outline'>
                      Social Media
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
