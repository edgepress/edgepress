import { buttonVariants } from "@edgepress/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@edgepress/ui/components/card";
import Link from "next/link";

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
                  className={buttonVariants({ variant: "default" })}
                  href="//app.localhost:3000/"
                >
                  App Home
                </Link>
                <Link 
                  className={buttonVariants({ variant: "outline" })}
                  href="//app.localhost:3000/posts"
                >
                  All Articles
                </Link>
                <Link 
                  className={buttonVariants({ variant: "outline" })}
                  href="//app.localhost:3000/posts/featured-post"
                >
                  Article Detail
                </Link>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Admin Interface</h3>
              <div className="flex flex-wrap gap-2">
                <Link 
                  className={buttonVariants({ variant: "default" })}
                  href="//admin.localhost:3000/"
                >
                  Admin Home
                </Link>
                <Link 
                  className={buttonVariants({ variant: "outline" })}
                  href="//admin.localhost:3000/users"
                >
                  User Management
                </Link>
                <Link 
                  className={buttonVariants({ variant: "outline" })}
                  href="//admin.localhost:3000/settings"
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
                  className={buttonVariants({ variant: "outline" })}
                  href="//checkout.localhost:3000/"
                >
                  Checkout Page
                </Link>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">API Testing</h3>
              <div className="flex flex-wrap gap-2">
                <Link 
                  className={buttonVariants({ variant: "outline" })}
                  href="/api/health"
                >
                  Health Check
                </Link>
                <Link 
                  className={buttonVariants({ variant: "outline" })}
                  href="/api/docs"
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
                  className={buttonVariants({ variant: "outline" })}
                  href="/dev/components"
                >
                  Component Showcase
                </Link>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Testing Pages</h3>
              <div className="flex flex-wrap gap-2">
                <Link 
                  className={buttonVariants({ variant: "outline" })}
                  href="/dev/test-mode"
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
                  className={buttonVariants({ variant: "outline" })} 
                  href="https://github.com/edgepress/edgepress"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  GitHub Repo
                </a>
                <a 
                  className={buttonVariants({ variant: "outline" })} 
                  href="https://edgepress.org/docs"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Dev Documentation
                </a>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Development Environment</h3>
              <div className="flex flex-wrap gap-2">
                <a 
                  className={buttonVariants({ variant: "outline" })} 
                  href="http://localhost:9000"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Dev Server
                </a>
                <a 
                  className={buttonVariants({ variant: "outline" })} 
                  href="http://localhost:8080"
                  rel="noopener noreferrer"
                  target="_blank"
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
