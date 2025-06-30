import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/utils/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { LoginSchema } from "@/utils/validaitionSchemas";
import * as bcrybt from "bcryptjs";



export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(data) {
        const validaition = LoginSchema.safeParse(data);
        if(validaition.success) {
          const { email, password } = validaition.data;
          const user = await prisma.user.findUnique({ where: { email } });
          if(!user || !user.password) return null;

          const isPasswordMatch = await bcrybt.compare(password, user.password);
          if(isPasswordMatch) return user;
        }

        return null;

      }
    })
  ],
});
