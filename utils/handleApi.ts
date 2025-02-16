interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    body?: any
    params?: Record<string, string>
    headers?: Record<string, string>
}

export interface ApiError {
    status: number;
    success: string;
    message: string;
    errors?: any;
}

const handleError = (error: any): never | ApiError => {
    const apiError: ApiError = {
        success: error.success || false,
        message: error?._data?.message || error?.message || 'Error desconocido',
        status: error.status || 500,
        errors: error?._data?.errors || null
    }

    // Manejar errores de red y CORS
    if (error instanceof TypeError && error.message === 'Network request failed') {
        apiError.status = 0
        apiError.message = 'Error de red - Verifica tu conexión'
    }

    if (error.message?.includes('CORS')) {
        apiError.status = 0
        apiError.message = 'Error de CORS - Verifica la configuración del servidor'
    }

    // Log del error para debugging
    console.error('API Error:', {
        url: error.url,
        status: apiError.status,
        message: apiError.message,
        raw: error
    })

    // throw apiError
    return apiError
}

export const handleApi = () => {
    const { $api } = useNuxtApp()

    const request = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T | ApiError> => {
        try {
            return await $api(endpoint, {
                method: options.method || 'GET',
                body: options.body,
                params: options.params,
                headers: options.headers
            })
        } catch (error) {
            // throw handleError(error)
            return handleError(error)
        }
    }

    return {
        get: <T>(endpoint: string, params?: Record<string, string>) =>
            request<T>(endpoint, { method: 'GET', params }),

        post: <T>(endpoint: string, body: any) =>
            request<T>(endpoint, { method: 'POST', body }),

        put: <T>(endpoint: string, body?: any) =>
            request<T>(endpoint, { method: 'PUT', body }),

        delete: <T>(endpoint: string) =>
            request<T>(endpoint, { method: 'DELETE' }),

        patch: <T>(endpoint: string, body?: any) =>
            request<T>(endpoint, { method: 'PATCH', body })
    }
}
