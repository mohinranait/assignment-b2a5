'use server';

import { TLoginInput, TRegisterInput } from "@/lib/validations/auth";



// Login action
export async function loginAction(data: TLoginInput) {
  try {
    // Validate input



    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    console.log({apiUrl});
    
    if (!apiUrl) {
      throw new Error('API URL is not configured');
    }

    // Call backend API
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Login failed');
    }

    const result = await response.json();
    
    
    // Return success with auth data
    return {
      success: true,
      data: result,
    };
  } catch (error) {
   

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

// Register action
export async function registerAction(data: TRegisterInput) {
  try {
   

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error('API URL is not configured');
    }

    // Prepare payload for API (exclude confirmPassword)
    const { confirmPassword, ...payload } = data;

    // Call backend API
    const response = await fetch(`${apiUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Registration failed');
    }

    const result = await response.json();
    
    return {
      success: true,
      data: result,
    };
  } catch (error) {
   

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}
