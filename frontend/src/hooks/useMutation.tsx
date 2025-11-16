'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { request } from '@/core/lib/axios';

export const useRequestMutation = <
  TResponse,
  TVariables = unknown,
  TError = Error,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<TResponse, TError, AxiosRequestConfig<TVariables>, TContext>,
    'mutationFn'
  >,
) => {
  const mutation = useMutation<TResponse, TError, AxiosRequestConfig<TVariables>, TContext>({
    mutationFn: (config: AxiosRequestConfig<TVariables>) => request<TResponse>(config),
    ...options,
  });

  const { mutate, mutateAsync, reset, status, data, error } = mutation;

  return {
    mutate,
    mutateAsync,
    reset,
    data,
    error,
    status,
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isSuccess: status === 'success',
    isError: status === 'error',
  };
};
