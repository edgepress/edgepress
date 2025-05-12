"use client";


import { useState } from "react";
import {Toaster} from 'sonner';

import {PlateEditor} from '@/components/editor/plate-editor';
import {SettingsProvider} from '@/components/editor/settings';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save, Image, Tag, Clock, Check, ChevronsUpDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const categories = [
  { value: "technology", label: "Technology" },
  { value: "web-development", label: "Web Development" },
  { value: "ai-machine-learning", label: "AI & Machine Learning" },
  { value: "ux-ui-design", label: "UX/UI Design" },
  { value: "productivity", label: "Productivity" },
];

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<object>({});
  const [publishing, setPublishing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [category, setCategory] = useState("");
  const [openCategoryPopover, setOpenCategoryPopover] = useState(false);

  const handleSaveDraft = async () => {
    if (!title) {
      alert("Please enter a title for your post");
      return;
    }

    setSaving(true);
    
    try {
      console.log("Saving draft...", { title, content, category });
      await new Promise(resolve => setTimeout(resolve, 1000)); // 模擬 API 延遲
      
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
      console.log("Publishing post...", { title, content, category });
      await new Promise(resolve => setTimeout(resolve, 1000)); // 模擬 API 延遲
      
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
          <Button asChild variant='ghost' size='sm' className='gap-1'>
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
            onClick={handleSaveDraft}
            disabled={saving || publishing}
          >
            {saving ? 'Saving...' : 'Save as Draft'}
          </Button>
          <Button onClick={handlePublish} disabled={saving || publishing}>
            <Save className='mr-2 h-4 w-4' />
            {publishing ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-6'>
        <div className='space-y-4'>
          <div>
            <input
              type='text'
              className='w-full text-4xl font-bold border-none bg-transparent focus:outline-none focus:ring-0 p-0'
              placeholder='Post Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='h-screen w-full' data-registry='plate'>
            <SettingsProvider>
              <PlateEditor />
            </SettingsProvider>

            <Toaster />
          </div>
        </div>

        <div className='space-y-4'>
          <div className='border rounded-md p-4 bg-background'>
            <h3 className='font-medium mb-3 flex items-center gap-2'>
              <Tag className='h-4 w-4' />
              Post Settings
            </h3>
            <Separator className='my-3' />

            <div className='space-y-4'>
              <div className='space-y-2'>
                <label htmlFor='category' className='text-sm font-medium block'>
                  Category
                </label>
                <Popover
                  open={openCategoryPopover}
                  onOpenChange={setOpenCategoryPopover}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      role='combobox'
                      aria-expanded={openCategoryPopover}
                      className='w-full justify-between'
                    >
                      {category
                        ? categories.find((c) => c.value === category)?.label
                        : 'Select a category...'}
                      <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-full p-0'>
                    <Command>
                      <CommandInput
                        placeholder='Search category...'
                        className='h-9'
                      />
                      <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                          {categories.map((c) => (
                            <CommandItem
                              key={c.value}
                              value={c.value}
                              onSelect={(currentValue) => {
                                setCategory(
                                  currentValue === category ? '' : currentValue
                                );
                                setOpenCategoryPopover(false);
                              }}
                            >
                              {c.label}
                              <Check
                                className={cn(
                                  'ml-auto h-4 w-4',
                                  category === c.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className='space-y-2'>
                <label
                  htmlFor='featured-image'
                  className='text-sm font-medium block'
                >
                  Featured Image
                </label>
                <div className='flex items-center justify-center border border-dashed rounded-md h-32 bg-muted/40'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='flex flex-col gap-1 h-auto py-3'
                  >
                    <Image className='h-5 w-5' />
                    <span className='text-xs'>Upload Image</span>
                  </Button>
                </div>
              </div>

              <div className='space-y-2'>
                <label htmlFor='schedule' className='text-sm font-medium block'>
                  Schedule
                </label>
                <div className='flex items-center gap-2'>
                  <Clock className='h-4 w-4 text-muted-foreground' />
                  <span className='text-sm'>Publish immediately</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
