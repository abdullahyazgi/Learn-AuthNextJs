"use server";
import { LoginSchema, SignupSchema } from "@/utils/validaitionSchemas";
import { z } from "zod";

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
  if (!validation.success) return { error: "Invalid credentials" };
  console.log(data);
  return { success: "Sign up successfuly" };
};
