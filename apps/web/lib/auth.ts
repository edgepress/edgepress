import { betterAuth } from "better-auth";
import { admin, organization } from "better-auth/plugins"
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@edgepress/prisma";
 
const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'mysql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    admin(),
    organization()
  ],
});
