"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save, Image, Tag, Clock } from "lucide-react";
import { DynamicPostEditor } from "@/components/app/post-editor";
import { Separator } from "@/components/ui/separator";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<object>({});
  const [publishing, setPublishing] = useState(false);
  const [saving, setSaving] = useState(false);

  // 處理保存草稿
  const handleSaveDraft = async () => {
    if (!title) {
      alert("Please enter a title for your post");
      return;
    }

    setSaving(true);
    
    try {
      // 這裡是模擬 API 調用
      console.log("Saving draft...", { title, content });
      await new Promise(resolve => setTimeout(resolve, 1000)); // 模擬 API 延遲
      
      // 保存成功後的處理
      alert("Draft saved successfully!");
    } catch (error) {
      console.error("Error saving draft:", error);
      alert("Failed to save draft. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // 處理發布文章
  const handlePublish = async () => {
    if (!title) {
      alert("Please enter a title for your post");
      return;
    }

    setPublishing(true);
    
    try {
      // 這裡是模擬 API 調用
      console.log("Publishing post...", { title, content });
      await new Promise(resolve => setTimeout(resolve, 1000)); // 模擬 API 延遲
      
      // 發布成功後的處理
      alert("Post published successfully!");
      // 發布後可以跳轉到文章列表頁面
      // window.location.href = "/app.edgepress.org/posts";
    } catch (error) {
      console.error("Error publishing post:", error);
      alert("Failed to publish post. Please try again.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="gap-1">
            <Link href="/app.edgepress.org/posts">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">New Post</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleSaveDraft}
            disabled={saving || publishing}
          >
            {saving ? "Saving..." : "Save as Draft"}
          </Button>
          <Button 
            onClick={handlePublish}
            disabled={saving || publishing}
          >
            <Save className="mr-2 h-4 w-4" />
            {publishing ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-6">
        <div className="space-y-4">
          <div>
            <input
              type="text"
              className="w-full text-4xl font-bold border-none bg-transparent focus:outline-none focus:ring-0 p-0"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <DynamicPostEditor onChange={setContent} />
        </div>
        
        <div className="space-y-4">
          <div className="border rounded-md p-4 bg-background">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Post Settings
            </h3>
            <Separator className="my-3" />
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium block">
                  Category
                </label>
                <select 
                  id="category"
                  className="w-full border rounded-md p-2 bg-transparent"
                >
                  <option value="">Select a category</option>
                  <option value="technology">Technology</option>
                  <option value="web-development">Web Development</option>
                  <option value="ai-machine-learning">AI & Machine Learning</option>
                  <option value="ux-ui-design">UX/UI Design</option>
                  <option value="productivity">Productivity</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="featured-image" className="text-sm font-medium block">
                  Featured Image
                </label>
                <div className="flex items-center justify-center border border-dashed rounded-md h-32 bg-muted/40">
                  <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-auto py-3">
                    <Image className="h-5 w-5" />
                    <span className="text-xs">Upload Image</span>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="schedule" className="text-sm font-medium block">
                  Schedule
                </label>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Publish immediately</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
