"use server";
import { LoginSchema, SignupSchema } from "@/utils/validaitionSchemas";
import { z } from "zod";
import { prisma } from "@/utils/prisma";
import * as bcrybt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { signOut } from "@/auth";
import { generateVerificationToken } from "@/utils/generateToken";
import { sendVerificationToken } from "@/utils/mail";

// loginAction
export const loginAction = async (data: z.infer<typeof LoginSchema>) => {
  const validation = LoginSchema.safeParse(data);
  if (!validation.success)
    return { success: false, message: "Invalid credentials" };

  const { email, password } = validation.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.email || !user.password)
      return { success: false, message: "Invalid credentials" };

    if (!user.emailVerified) {
      const verificationToken = await generateVerificationToken(email);
      await sendVerificationToken(
        verificationToken.email,
        verificationToken.token
      );

      return { success: true, message: "Email sent, verify your email" };
    }

    await signIn("credentials", { email, password, redirectTo: "/profile" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid email or password" };
        default:
          return { success: false, message: "Somthing went wrong" };
      }
    }
    throw error;
  }

  return { success: true, message: "Logged in successfuly" };
};

// signupAction
export const signupAction = async (data: z.infer<typeof SignupSchema>) => {
  const validation = SignupSchema.safeParse(data);
  if (!validation.success)
    return { success: false, message: "Invalid credentials" };
  const { name, email, password } = validation.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) return { success: false, message: "User already exist" };
    const salt = await bcrybt.genSalt(10);
    const hashedPassword = await bcrybt.hash(password, salt);
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationToken(
      verificationToken.email,
      verificationToken.token
    );

    return { success: true, message: "Email sent, verify your email" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Somthing went wrong, please try again" };
  }
};

// signOut
export const signOutAction = async () => {
  await signOut();
};
