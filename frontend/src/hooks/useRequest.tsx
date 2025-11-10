'use client'

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { request } from "@/core/lib/axios";

export const useRequest = <TData, TError = Error>(
  key: string | unknown[],
  config: Parameters<typeof request>[0], // The Axios config to pass to request()
  options?: Omit<UseQueryOptions<TData, TError, TData>, "queryKey" | "queryFn">
) => {
  const query = useQuery<TData, TError>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: () => request<TData>(config),
    ...options,
  });

  return {
    data: query.data,
    error: query.error,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    refetch: query.refetch,
  };
};