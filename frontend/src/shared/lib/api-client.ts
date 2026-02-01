import axios from "axios";
import type { AxiosInstance, AxiosError } from "axios";

const PROXY_URL = `${window.origin}/api`;

type ApiClientConfig = {
    baseURL: string;
};

export function createApiClient({ baseURL }: ApiClientConfig) {
    const client: AxiosInstance = axios.create({
        baseURL: `${PROXY_URL}/${baseURL}`,
    });

    client.interceptors.response.use(
        (response) => response.data,
        (error: AxiosError) => Promise.reject(error),
    );

    return {
        get: <TResponse = any, TParams = Record<string, any>>(
            url: string,
            params?: TParams,
        ): Promise<TResponse> => {
            return client.get<TResponse, TResponse>(url, { params });
        },

        post: <TResponse = any, TData = any>(
            url: string,
            data?: TData,
        ): Promise<TResponse> => {
            return client.post<TResponse, TResponse>(url, data);
        },

        put: <TResponse = any, TData = any>(
            url: string,
            data?: TData,
        ): Promise<TResponse> => {
            return client.put<TResponse, TResponse>(url, data);
        },

        patch: <TResponse = any, TData = any>(
            url: string,
            data?: TData,
        ): Promise<TResponse> => {
            return client.patch<TResponse, TResponse>(url, data);
        },

        delete: <TResponse = any>(url: string): Promise<TResponse> => {
            return client.delete<TResponse, TResponse>(url);
        },
    };
}
