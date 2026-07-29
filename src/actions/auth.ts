'use server';
import { TLoginInput } from "@/lib/validations/auth";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken"
import { redirect } from "next/navigation";

// Login action
export async function loginAction(data: TLoginInput) {
  let redirectUrl: string | null = null;
  let result: any = null;


  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not configured');
  }

  const response = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Login failed');
  }

  result = await response.json();

  if (result.success) {
    const cookiesStore = await cookies();
    cookiesStore.set('accessToken', result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

    if (decodedToken.role === "Customer") {
      redirectUrl = "/dashboard";
    } else if (decodedToken.role === "Admin") {
      redirectUrl = "/admin";
    } else if (decodedToken.role === "Provider") {
      redirectUrl = "/provider";
    }
  }



  if (redirectUrl) {
    redirect(redirectUrl);
  }

  return result;
}
