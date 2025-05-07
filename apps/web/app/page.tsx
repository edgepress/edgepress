import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DevHomePage() {

  if (process.env.VERCEL_ENV === 'production') {
    return <div>Not found</div>;
  }

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <header className="mb-8 pb-4 border-b">
        <h1 className="text-3xl font-bold mb-2">EdgePress Development Portal</h1>
        <p className="text-muted-foreground">
          Quick navigation to environments and pages (for development use only)
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Main Environments */}
        <Card>
          <CardHeader>
            <CardTitle>Main Environments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="font-medium">User Interface</h3>
              <div className="flex flex-wrap gap-2">
                <Link 
                  href="//app.localhost:3000/"
                  className={buttonVariants({ variant: "default" })}
                >
                  App Home
                </Link>
                <Link 
                  href="//app.localhost:3000/posts"
                  className={buttonVariants({ variant: "outline" })}
                >
                  All Articles
                </Link>
                <Link 
                  href="//app.localhost:3000/posts/featured-post"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Article Detail
                </Link>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Admin Interface</h3>
              <div className="flex flex-wrap gap-2">
                <Link 
                  href="//admin.localhost:3000/"
                  className={buttonVariants({ variant: "default" })}
                >
                  Admin Home
                </Link>
                <Link 
                  href="//admin.localhost:3000/users"
                  className={buttonVariants({ variant: "outline" })}
                >
                  User Management
                </Link>
                <Link 
                  href="//admin.localhost:3000/settings"
                  className={buttonVariants({ variant: "outline" })}
                >
                  System Settings
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Other Environments */}
        <Card>
          <CardHeader>
            <CardTitle>Other Environments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="font-medium">Checkout Flow</h3>
              <div className="flex flex-wrap gap-2">
                <Link 
                  href="//checkout.localhost:3000/"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Checkout Page
                </Link>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">API Testing</h3>
              <div className="flex flex-wrap gap-2">
                <Link 
                  href="/api/health"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Health Check
                </Link>
                <Link 
                  href="/api/docs"
                  className={buttonVariants({ variant: "outline" })}
                >
                  API Docs
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Development Tools */}
        <Card>
          <CardHeader>
            <CardTitle>Development Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="font-medium">Component Library</h3>
              <div className="flex flex-wrap gap-2">
                <Link 
                  href="/dev/components"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Component Showcase
                </Link>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Testing Pages</h3>
              <div className="flex flex-wrap gap-2">
                <Link 
                  href="/dev/test-mode"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Test Mode
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resource Links */}
        <Card>
          <CardHeader>
            <CardTitle>Resource Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="font-medium">Documentation</h3>
              <div className="flex flex-wrap gap-2">
                <a 
                  href="https://github.com/edgepress/edgepress" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline" })}
                >
                  GitHub Repo
                </a>
                <a 
                  href="https://edgepress.org/docs" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Dev Documentation
                </a>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Development Environment</h3>
              <div className="flex flex-wrap gap-2">
                <a 
                  href="http://localhost:9000" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Dev Server
                </a>
                <a 
                  href="http://localhost:8080" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Database Admin
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
        <p>EdgePress Development Version - This page is for development use only and will not be displayed in production</p>
        <p className="mt-1">
          Environment: <code className="bg-muted px-1 py-0.5 rounded text-xs">{process.env.NODE_ENV}</code> | 
          Version: <code className="bg-muted px-1 py-0.5 rounded text-xs">dev</code>
        </p>
      </footer>
    </div>
  );
}
