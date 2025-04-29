export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome to EdgePress Admin</h1>
        <p className="text-muted-foreground">
          Manage your content, users, and settings from this dashboard.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-6 bg-background border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Content</h2>
          <p className="text-muted-foreground">
            Manage posts, pages, and other content
          </p>
        </div>
        <div className="p-6 bg-background border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p className="text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
        <div className="p-6 bg-background border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Settings</h2>
          <p className="text-muted-foreground">
            Configure site settings and preferences
          </p>
        </div>
      </div>
    </div>
  );
}
