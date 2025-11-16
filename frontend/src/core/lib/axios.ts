import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: '/api',
});

export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await api.request(config);
  return response.data;
};
