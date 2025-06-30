"use server";
import { LoginSchema, SignupSchema } from "@/utils/validaitionSchemas";
import { z } from "zod";
import { prisma } from "@/utils/prisma";
import * as bcrybt from "bcryptjs";

// loginAction
export const loginAction = async (data: z.infer<typeof LoginSchema>) => {
  const validation = LoginSchema.safeParse(data);
  if (!validation.success) return { error: "Invalid credentials" };
  console.log(data);
  return { success: "Logged in successfuly" };
};

// signupAction
export const signupAction = async (data: z.infer<typeof SignupSchema>) => {
  const validation = SignupSchema.safeParse(data);
  if (!validation.success) return { success: false, message: "Invalid credentials" };

  const { name, email, password } = validation.data;
  const user = await prisma.user.findUnique({ where: {email} });
  if(user) return {success: false, message: "User already exist"};
  const salt = await bcrybt.genSalt(10);
  const hashedPassword = await bcrybt.hash(password, salt);
  await prisma.user.create({
    data: {name, email, password: hashedPassword}
  });
  
  return { success: true, message: "Sign up successfuly" };
};
