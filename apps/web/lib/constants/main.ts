export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'EdgePress';

export const ADMIN_HOSTNAMES = new Set([
  `admin.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  'admin.edgepress.org',
  'admin.localhost:3000',
]);

export const APP_HOSTNAMES = new Set([
  `app.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  'app.edgepress.org',
  'app.localhost:3000',
]);

export const CHECKOUT_HOSTNAMES = new Set([
  `checkout.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  'checkout.edgepress.org',
  'checkout.localhost:3000',
]);
