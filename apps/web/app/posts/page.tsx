import { AppLayout } from "@/components/app/app-layout";

export default function PostsPage() {
  return (
    <AppLayout 
      title="Posts" 
      breadcrumbs={[
        { title: "Dashboard", href: "/" }
      ]}
    >
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </AppLayout>
  );
} 
