'use client';

import { useState, useEffect, useCallback } from 'react';
import { authApi, LoginPayload, RegisterPayload, AuthResponse } from '@/lib/api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'provider';
}

interface UseAuthReturn {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<boolean>;
  register: (payload: RegisterPayload) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user from storage on mount
  useEffect(() => {
    const storedUser = authApi.getStoredUser();
    const storedToken = authApi.getStoredToken();

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (payload: LoginPayload): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    const response = await authApi.login(payload);

    if (response.success && response.data) {
      const { token, user: userData } = response.data;
      setToken(token);
      setUser(userData);
      authApi.storeAuth(token, userData);
      return true;
    } else {
      setError(response.error || 'Login failed');
      return false;
    }
  }, []);

  const register = useCallback(async (payload: RegisterPayload): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    const response = await authApi.register(payload);

    if (response.success && response.data) {
      const { token, user: userData } = response.data;
      setToken(token);
      setUser(userData);
      authApi.storeAuth(token, userData);
      return true;
    } else {
      setError(response.error || 'Registration failed');
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    authApi.logout();
    setUser(null);
    setToken(null);
    setError(null);
  }, []);

  return {
    user,
    token,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token,
  };
}
