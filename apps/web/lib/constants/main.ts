export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'EdgePress';

export const ADMIN_HOSTNAMES = new Set([
  `admin.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  'admin.localhost:3000',
  'admin.edgepress.org',
]);

export const APP_HOSTNAMES = new Set([
  `app.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  'app.localhost:3000',
  'app.edgepress.org',
]);
