import { Button } from "@/components/ui/button";
import { Tag, Plus, Edit, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// 模擬分類數據
const mockCategories = [
  { id: "1", name: "Technology", articleCount: 12, slug: "technology" },
  { id: "2", name: "Web Development", articleCount: 8, slug: "web-development" },
  { id: "3", name: "AI & Machine Learning", articleCount: 5, slug: "ai-machine-learning" },
  { id: "4", name: "UX/UI Design", articleCount: 3, slug: "ux-ui-design" },
  { id: "5", name: "Productivity", articleCount: 4, slug: "productivity" },
];

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground mt-1">
            Organize your articles with categories
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Category
        </Button>
      </div>

      <Separator />

      <div className="space-y-4">
        {mockCategories.map((category) => (
          <div 
            key={category.id}
            className="flex items-center justify-between p-4 border rounded-lg bg-background"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Tag className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.articleCount} article{category.articleCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-destructive">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
