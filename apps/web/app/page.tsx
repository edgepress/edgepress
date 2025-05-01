import Link from "next/link";
import { buttonVariants } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function DevHomePage() {
  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <header className="mb-8 pb-4 border-b">
        <h1 className="text-3xl font-bold mb-2">EdgePress Development Portal</h1>
        <p className="text-muted-foreground">
          快速導航到各個環境和頁面（僅用於開發階段）
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 主要環境 */}
        <Card>
          <CardHeader className="bg-muted/50">
            <CardTitle>主要環境</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">使用者介面</h3>
              <div className="flex flex-wrap gap-2">
                <Link 
                  href="//app.localhost:3000/"
                  className={buttonVariants({ variant: "default" })}
                >
                  App 主頁
                </Link>
                <Link 
                  href="//app.localhost:3000/posts"
                  className={buttonVariants({ variant: "outline" })}
                >
                  所有文章
                </Link>
                <Link 
                  href="//app.localhost:3000/posts/featured-post"
                  className={buttonVariants({ variant: "outline" })}
                >
                  文章詳情
                </Link>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">管理介面</h3>
              <div className="flex flex-wrap gap-2">
                <Link 
                  href="//admin.localhost:3000/"
                  className={buttonVariants({ variant: "default" })}
                >
                  Admin 主頁
                </Link>
                <Link 
                  href="//admin.localhost:3000/users"
                  className={buttonVariants({ variant: "outline" })}
                >
                  用戶管理
                </Link>
                <Link 
                  href="//admin.localhost:3000/settings"
                  className={buttonVariants({ variant: "outline" })}
                >
                  系統設置
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 其他環境 */}
        <Card>
          <CardHeader className="bg-muted/50">
            <CardTitle>其他環境</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">結帳流程</h3>
              <div className="flex flex-wrap gap-2">
                <Link 
                  href="//checkout.localhost:3000/"
                  className={buttonVariants({ variant: "outline" })}
                >
                  結帳頁面
                </Link>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">API 測試</h3>
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
                  API 文檔
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 開發工具 */}
        <Card>
          <CardHeader className="bg-muted/50">
            <CardTitle>開發工具</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">組件庫</h3>
              <div className="flex flex-wrap gap-2">
                <Link 
                  href="/dev/components"
                  className={buttonVariants({ variant: "outline" })}
                >
                  組件展示
                </Link>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">測試頁面</h3>
              <div className="flex flex-wrap gap-2">
                <Link 
                  href="/dev/test-mode"
                  className={buttonVariants({ variant: "outline" })}
                >
                  測試模式
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 資源鏈接 */}
        <Card>
          <CardHeader className="bg-muted/50">
            <CardTitle>資源鏈接</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">文檔</h3>
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
                  開發文檔
                </a>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">開發環境</h3>
              <div className="flex flex-wrap gap-2">
                <a 
                  href="http://localhost:9000" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline" })}
                >
                  開發服務器
                </a>
                <a 
                  href="http://localhost:8080" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline" })}
                >
                  數據庫管理
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
        <p>EdgePress 開發版本 - 此頁面僅供開發使用，不會在生產環境顯示</p>
        <p className="mt-1">
          執行環境: <code className="bg-muted px-1 py-0.5 rounded text-xs">{process.env.NODE_ENV}</code> | 
          版本: <code className="bg-muted px-1 py-0.5 rounded text-xs">dev</code>
        </p>
      </footer>
    </div>
  );
}
