// src/lib/api/client.ts
import { Context } from '@/util-components/root/context';
import { QueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { getErrorMessage } from '../utils/handle-error';

// Create a client with Suspense enabled
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Base API URL
export const API_URL = process.env.REACT_APP_API || 'http://localhost:3001/v1.0';

// Error type definition
export interface ApiError {
  status: number;
  message: string;
  data?: any;
}

// Generic API request function (fallback without context)
export async function fetchApi<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  body?: any,
  customHeaders?: Record<string, string>,
  accessToken?: string
): Promise<T> {
  const url = `${API_URL}/${endpoint.startsWith('/') ? endpoint.substring(1) : endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  // Use provided token or fallback to localStorage
  const token = accessToken || localStorage.getItem('auth_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await getErrorMessage(response);
    throw error;
  }

  // Handle empty responses
  if (response.status === 204) {
    return {} as T;
  }

  return await response.json();
}

// Custom hook that provides an API client with context values
export function useApiClient() {
  const { setError, accessToken } = useContext(Context);

  const apiRequest = async <T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
    body?: any,
    customHeaders?: Record<string, string>
  ): Promise<T> => {
    const url = `${API_URL}/${endpoint.startsWith('/') ? endpoint.substring(1) : endpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const config: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await getErrorMessage(response);
        if (setError) {
          setError(error);
        }
        throw error;
      }

      // Handle empty responses
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  return { apiRequest };
}