"use client";

import { useState } from "react";

import { Button } from "@edgepress/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@edgepress/ui/components/card";
import { Input } from "@edgepress/ui/components/input";
import { Label } from "@edgepress/ui/components/label";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/sign-in/email', {
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      if (response.ok) {
        toast.success("登入成功！");
        window.location.href = '/posts/new';
      } else {
        const error = await response.json();
        toast.error(error.message || "登入失敗");
      }
    } catch (error) {
      toast.error("登入時發生錯誤");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      toast.error("請填寫 email 和 password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/sign-up/email', {
        body: JSON.stringify({
          email,
          name: email.split('@')[0], // Use email prefix as name
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      if (response.ok) {
        toast.success("註冊成功！請登入");
      } else {
        const error = await response.json();
        toast.error(error.message || "註冊失敗");
      }
    } catch (error) {
      toast.error("註冊時發生錯誤");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    window.location.href = `/api/auth/sign-in/${provider}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">登入 EdgePress</CardTitle>
          <CardDescription>
            選擇您的登入方式
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4" onSubmit={handleEmailLogin}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                type="password"
              />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" disabled={isLoading} type="submit">
                {isLoading ? "登入中..." : "登入"}
              </Button>
              <Button 
                variant="outline" 
                className="flex-1" 
                disabled={isLoading} 
                onClick={handleRegister}
                type="button"
              >
                註冊
              </Button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                或使用
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full" 
              disabled={isLoading}
              onClick={() => handleSocialLogin('github')}
            >
              使用 GitHub 登入
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              disabled={isLoading}
              onClick={() => handleSocialLogin('google')}
            >
              使用 Google 登入
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <Button 
              variant="link" 
              className="p-0 h-auto text-xs"
              onClick={() => window.location.href = '/api/debug/auth'}
            >
              查看驗證狀態
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
