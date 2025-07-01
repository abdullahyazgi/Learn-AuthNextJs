import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";;
import { LoginSchema } from "@/utils/validaitionSchemas";
import { prisma } from "@/utils/prisma";
import * as bcrybt from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(data) {
        const validaition = LoginSchema.safeParse(data);
        if (validaition.success) {
          const { email, password } = validaition.data;
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user || !user.password) return null;

          const isPasswordMatch = await bcrybt.compare(password, user.password);
          if (isPasswordMatch) return user;
        }

        return null;
      },
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
} satisfies NextAuthConfig;