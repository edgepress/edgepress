import { Button } from "@edgepress/ui/components/button";
import { Separator } from "@edgepress/ui/components/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="p-6 border rounded-lg bg-background space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Notification Settings</h2>
          <p className="text-sm text-muted-foreground">
            Choose how you want to be notified about activity
          </p>
          <Separator className="my-4" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Receive email updates about article performance and comments
                </p>
              </div>
              <div className="flex items-center h-5">
                <input
                  id="email-notifications"
                  className="h-4 w-4 rounded border-gray-300"
                  defaultChecked
                  aria-label="Enable email notifications"
                  type="checkbox"
                />
                <label className="sr-only" htmlFor="email-notifications">
                  Enable email notifications
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Comment Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when someone comments on your articles
                </p>
              </div>
              <div className="flex items-center h-5">
                <input
                  id="comment-notifications"
                  className="h-4 w-4 rounded border-gray-300"
                  defaultChecked
                  aria-label="Enable comment notifications"
                  type="checkbox"
                />
                <label className="sr-only" htmlFor="comment-notifications">
                  Enable comment notifications
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Marketing Emails</h3>
                <p className="text-sm text-muted-foreground">
                  Receive updates about new features and tips
                </p>
              </div>
              <div className="flex items-center h-5">
                <input
                  id="marketing-emails"
                  className="h-4 w-4 rounded border-gray-300"
                  aria-label="Enable marketing emails"
                  type="checkbox"
                />
                <label className="sr-only" htmlFor="marketing-emails">
                  Enable marketing emails
                </label>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold">Account Preferences</h2>
          <p className="text-sm text-muted-foreground">
            Update your account settings
          </p>
          <Separator className="my-4" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Display Language</h3>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred language for the interface
                </p>
              </div>
              <label className="sr-only" htmlFor="language-select">Select display language</label>
              <select 
                id="language-select"
                className="px-3 py-2 border rounded-md bg-transparent"
                aria-label="Select display language"
              >
                <option value="en">English</option>
                <option value="zh-tw">繁體中文</option>
                <option value="ja">日本語</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Enable dark mode for the interface
                </p>
              </div>
              <div className="flex items-center h-5">
                <input
                  id="dark-mode"
                  className="h-4 w-4 rounded border-gray-300"
                  aria-label="Enable dark mode"
                  type="checkbox"
                />
                <label className="sr-only" htmlFor="dark-mode">
                  Enable dark mode
                </label>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold text-red-500">Danger Zone</h2>
          <p className="text-sm text-muted-foreground">
            Irreversible and destructive actions
          </p>
          <Separator className="my-4" />
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-medium">Deactivate Account</h3>
                <p className="text-sm text-muted-foreground">
                  Temporarily deactivate your account and hide your content
                </p>
              </div>
              <Button variant="outline" className="border-red-200 text-red-500 hover:text-red-500 hover:bg-red-50">
                Deactivate Account
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-medium">Delete Account</h3>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all your content
                </p>
              </div>
              <Button variant="destructive">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
